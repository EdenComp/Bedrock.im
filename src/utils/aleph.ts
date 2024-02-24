import {aggregate, post} from "aleph-sdk-ts/dist/messages";
import {
  AlephAccount,
  AlephAccountAggregate
} from "../context/useAlephAccount.tsx";
import {alephAggregateKey, alephChannel, alephPostType} from "./config.ts";
import {ETHAccount} from "aleph-sdk-ts/dist/accounts/ethereum";
import {ResolvedNote} from "./types.ts";


export const createNote = async ({ account, data: { items } }: AlephAccount, { content }: ResolvedNote) => {
  const { item_hash } = await post.Publish({
    account: account,
    channel: alephChannel,
    postType: alephPostType,
    content,
  });

  await aggregate.Publish<AlephAccountAggregate>({
    account: account,
    content: {
      items: [item_hash, ...items],
    },
    key: alephAggregateKey,
    channel: alephChannel,
  });
}

export const updateNote = async ({ account }: AlephAccount, { content, hash }: ResolvedNote) => {
  await post.Publish({
    account,
    channel: alephChannel,
    postType: "amend",
    ref: hash,
    content,
  });
}

export const deleteNote = async ({ account }: AlephAccount, hash: string) => {
  await post.Publish({
    account: account,
    content: {},
    channel: alephChannel,
    postType: "delete",
    ref: hash,
  });
}

export const loadAggregate = async (account: ETHAccount) => {
  try {
    return aggregate.Get<AlephAccountAggregate>({
      address: account.address,
      key: alephAggregateKey,
    })
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
