import { aggregate, post } from "aleph-sdk-ts/dist/messages";
import { alephAggregateKey, alephChannel, alephPostType } from "./config.ts";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { base64ToObject, encryptedBase64ToObject, objectToBase64, objectToEncryptedBase64 } from "./crypto.ts";
import {
  AggregateNote,
  AuthenticatedNote,
  LocalNoteSchema,
  NoteAuthenticatedDataSchema,
  UnauthenticatedNote,
} from "./types.ts";
import { z } from "zod";
import { isAxiosError } from "axios";

export const getNote = async (
  account: ETHAccount,
  noteHash: string,
): Promise<AuthenticatedNote | UnauthenticatedNote> => {
  const {
    posts: [note],
  } = await post.Get<UnauthenticatedNote>({
    hashes: [noteHash],
    types: alephPostType,
  });

  const {
    content: { secret, hash, data, owner },
  } = note;

  // @ts-expect-error Typescript is too dumb to under that the data field is either a string or an object in either case
  return {
    secret,
    hash,
    owner,
    data: secret
      ? owner === account.address
        ? await encryptedBase64ToObject(account, data, NoteAuthenticatedDataSchema)
        : data
      : base64ToObject(data, NoteAuthenticatedDataSchema),
  };
};

export const createNote = async (
  account: ETHAccount,
  aggregateNotes: AggregateNote[],
  { secret, data: { body, title, updatedAt }, owner = account.address }: z.infer<typeof LocalNoteSchema>,
) => {
  const { item_hash: hash } = await post.Publish({
    account,
    channel: alephChannel,
    postType: alephPostType,
    content: {
      secret,
      data: secret ? await objectToEncryptedBase64(account, { body }) : objectToBase64({ body }),
      owner: owner,
    },
  });
  const newAggregateNotes: AggregateNote[] = [
    {
      data: {
        title,
        updatedAt,
      },
      secret,
      hash,
      owner,
    },
    ...aggregateNotes,
  ];
  await updateAggregate(account, await objectToEncryptedBase64(account, newAggregateNotes));
  return hash;
};

export const updateNote = async (
  account: ETHAccount,
  { secret, data: { body }, hash, owner = account.address }: z.infer<typeof LocalNoteSchema>,
) => {
  await post.Publish({
    account,
    channel: alephChannel,
    postType: "amend",
    ref: hash,
    content: {
      secret,
      data: secret ? await objectToEncryptedBase64(account, { body }) : objectToBase64({ body }),
      owner: owner,
    },
  });
};

export const deleteNote = async (account: ETHAccount, hash: string) => {
  await post.Publish({
    account,
    content: {},
    channel: alephChannel,
    postType: "delete",
    ref: hash,
  });
};

export const updateAggregate = async <T>(account: ETHAccount, content: T) => {
  await aggregate.Publish<{ data: T }>({
    account,
    content: {
      data: content,
    },
    key: alephAggregateKey,
    channel: alephChannel,
  });
};

export const loadAggregate = async <T>(account: ETHAccount, defaultValue: T): Promise<T | undefined> => {
  try {
    const result = await aggregate.Get<{ [alephAggregateKey]: { data: T } }>({
      address: account.address,
      key: alephAggregateKey,
    });
    return result[alephAggregateKey].data;
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response?.status === 404) {
      console.warn("Aggregate not found", e);
      await updateAggregate<T>(account, defaultValue);
      return defaultValue;
    }
    throw e;
  }
};
