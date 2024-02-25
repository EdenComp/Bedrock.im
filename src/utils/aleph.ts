import { aggregate, post } from 'aleph-sdk-ts/dist/messages'
import { alephAggregateKey, alephChannel, alephPostType } from './config.ts'
import { ETHAccount } from 'aleph-sdk-ts/dist/accounts/ethereum'
import { base64ToObject, encryptedBase64ToObject, objectToBase64, objectToEncryptedBase64 } from './crypto.ts'
import {
  AggregateNote,
  AuthenticatedNote,
  LocalNote,
  LocalNoteSchema,
  NoteAuthenticatedDataSchema,
  UnauthenticatedNote,
} from './types.ts'
import { z } from 'zod'
import { isAxiosError } from 'axios'

export const getNote = async (account: ETHAccount, noteHash: string): Promise<AuthenticatedNote> => {
  const {posts: [note]} = await post.Get<UnauthenticatedNote>({
    hashes: [noteHash],
    types: alephPostType,
  })

  const {content: {secret, hash, data}} = note

  return {
    data: secret ? await encryptedBase64ToObject(account, data, NoteAuthenticatedDataSchema) : base64ToObject(data, NoteAuthenticatedDataSchema),
    hash,
    secret,
  }
}

export const createNote = async (account: ETHAccount, aggregateNotes: AggregateNote[], {
  secret,
  data: {body, title, updatedAt},
}: z.infer<typeof LocalNoteSchema>) => {
  const {item_hash: hash} = await post.Publish({
    account,
    channel: alephChannel,
    postType: alephPostType,
    content: {
      secret,
      data: secret ? await objectToEncryptedBase64(account, {body}) : objectToBase64({body}),
    },
  })
  const newAggregateNotes: AggregateNote[] = [
    {
      data: {
        title,
        updatedAt,
      },
      secret,
      hash,
    },
    ...aggregateNotes,
  ]
  await updateAggregate(account, objectToEncryptedBase64(account, newAggregateNotes))
}

export const updateNote = async (account: ETHAccount, {hash, ...note}: LocalNote) => {
  await post.Publish({
    account,
    channel: alephChannel,
    postType: 'amend',
    ref: hash,
    content: note,
  })
}

export const deleteNote = async (account: ETHAccount, hash: string) => {
  await post.Publish({
    account,
    content: {},
    channel: alephChannel,
    postType: 'delete',
    ref: hash,
  })
}

export const updateAggregate = async <T>(account: ETHAccount, content: T) => {
  console.warn('Updating aggregate', content)
  await aggregate.Publish<{ data: T }>({
    account,
    content: {
      data: content,
    },
    key: alephAggregateKey,
    channel: alephChannel,
  })
}

export const loadAggregate = async <T>(account: ETHAccount, defaultValue: T): Promise<T | undefined> => {
  console.log('Loading aggregate', defaultValue)
  try {
    const result = (await aggregate.Get<{ [alephAggregateKey]: { data: T } }>({
      address: account.address,
      key: alephAggregateKey,
    }))
    console.log('found', result)
    return result[alephAggregateKey].data
  } catch (e: unknown) {
    if (isAxiosError(e) && e.response?.status === 404) {
      console.warn('Aggregate not found', e)
      await updateAggregate<T>(account, defaultValue)
      return defaultValue
    }
    throw e
  }
}
