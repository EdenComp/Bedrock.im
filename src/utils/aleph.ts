import {aggregate, post} from "aleph-sdk-ts/dist/messages";
import {
  AlephAccount,
  AlephAccountAggregate
} from "../context/useAlephAccount.tsx";
import {alephAggregateKey, alephChannel, alephPostType} from "./config.ts";
import {ETHAccount} from "aleph-sdk-ts/dist/accounts/ethereum";

export const createNote = async (account: AlephAccount, content: unknown) => {
  const newNote = await post.Publish({
    account: account.account,
    content,
    channel: alephChannel,
    postType: alephPostType,
  });

  await aggregate.Publish<AlephAccountAggregate>({
    account: account.account,
    content: {
      items: [newNote.item_hash, ...account.data.items],
    },
    key: alephAggregateKey,
    channel: alephChannel,
  });
}

export const updateNote = async (account: AlephAccount, hash: string, content: unknown) => {
  const newNote = await post.Publish({
    account: account.account,
    content,
    channel: alephChannel,
    postType: "amend",
    ref: hash,
  });

  await aggregate.Publish<AlephAccountAggregate>({
    account: account.account,
    content: {
      items: [newNote.item_hash, ...account.data.items],
    },
    key: alephAggregateKey,
    channel: alephChannel,
  });
}

export const loadAggregate = async (account: ETHAccount) => {
  try {
    const data = await aggregate.Get<AlephAccountAggregate>({
      address: account.address,
      key: alephAggregateKey,
    });
    return data
  } catch (e: any) {
    if (e.response?.status === 404) {
      await aggregate.Publish<AlephAccountAggregate>({
        account: account,
        content: {
          items: [],
        },
        key: alephAggregateKey,
        channel: alephChannel,
      })
    }
    throw e
  }
}