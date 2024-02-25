import { z } from 'zod'

export const NoteLocalStatusSchema = z.enum(['draft', 'modified', 'saved'])

export const NoteMetadataSchema = z.object({
  secret: z.boolean(),
  hash: z.string(),
})
export const NoteLocalMetadataSchema = z.object({
  secret: z.boolean(),
  status: NoteLocalStatusSchema,
  hash: z.string().optional(),
})

export const NoteAggregateDataSchema = z.object({
  title: z.string(),
  updatedAt: z.date({coerce: true}),
})
export const NoteAuthenticatedDataSchema = z.object({
  body: z.string(),
})
export const NoteUnauthenticatedDataSchema = z.string()
export const NoteLocalDataSchema = NoteAggregateDataSchema.merge(NoteAuthenticatedDataSchema)

export const NoteSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  data: dataSchema,
})

export const UnauthenticatedNoteSchema = NoteSchema(NoteUnauthenticatedDataSchema).merge(NoteMetadataSchema)
export const AuthenticatedNoteSchema = NoteSchema(NoteAuthenticatedDataSchema).merge(NoteMetadataSchema)
export const AggregateNoteSchema = NoteSchema(NoteAggregateDataSchema).merge(NoteMetadataSchema)
export const LocalNoteSchema = NoteSchema(NoteLocalDataSchema).merge(NoteLocalMetadataSchema)

export type UnauthenticatedNote = z.infer<typeof UnauthenticatedNoteSchema>
export type AuthenticatedNote = z.infer<typeof AuthenticatedNoteSchema>
export type AggregateNote = z.infer<typeof AggregateNoteSchema>
export type LocalNote = z.infer<typeof LocalNoteSchema>
