import { useAlephAccount } from '../context/useAlephAccount.tsx'
import { encryptedBase64ToObject, objectToEncryptedBase64 } from '../utils/crypto.ts'
import { AggregateNote, AggregateNoteSchema, LocalNote } from '../utils/types.ts'
import { loadAggregate } from '../utils/aleph.ts'
import { z } from 'zod'
import { useCallback, useState } from 'react'

export interface Notes {
  aggregateNotes: AggregateNote[]
  notes: LocalNote[]
}

export default function useNotes(): Notes | null {
  const [result, setResult] = useState<Notes | null>(null)
  const alephAccount = useAlephAccount()

  const getNotes = useCallback(async () => {
    if (!alephAccount)
      return null
    const rawAggregateNotesData = await loadAggregate(alephAccount, await objectToEncryptedBase64(alephAccount, []))
    if (rawAggregateNotesData === undefined)
      throw new Error('Failed to load aggregate notes')
    const aggregateNotes = await encryptedBase64ToObject(alephAccount, rawAggregateNotesData, z.array(AggregateNoteSchema))

    setResult({
      aggregateNotes,
      notes: [],
    })
  }, [alephAccount])

  if (!result)
    getNotes()

  return result
}
