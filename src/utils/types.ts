import { z } from "zod";

export const NoteLocalStatus = ["draft", "modified", "saved"] as const;
export type NoteLocalStatus = (typeof NoteLocalStatus)[number];
export const NoteLocalStatusSchema = z.enum(NoteLocalStatus);

export const NoteCommonMetadataSchema = z.object({
  secret: z.boolean(),
  owner: z.string(),
});

export const NoteRemoteMetadataSchema = z
  .object({
    hash: z.string(),
  })
  .merge(NoteCommonMetadataSchema);
export const NoteLocalMetadataSchema = z
  .object({
    status: NoteLocalStatusSchema,
    hash: z.string().optional(),
  })
  .merge(NoteCommonMetadataSchema);

export const NoteAggregateDataSchema = z.object({
  title: z.string(),
  updatedAt: z.date({ coerce: true }),
});
export const NoteAuthenticatedDataSchema = z.object({
  body: z.string(),
});
export const NoteUnauthenticatedDataSchema = z.string();
export const NoteLocalDataSchema = NoteAggregateDataSchema.merge(NoteAuthenticatedDataSchema);

export const NoteSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  });

export const UnauthenticatedNoteSchema = NoteSchema(NoteUnauthenticatedDataSchema).merge(NoteRemoteMetadataSchema);
export const AuthenticatedNoteSchema = NoteSchema(NoteAuthenticatedDataSchema).merge(NoteRemoteMetadataSchema);
export const AggregateNoteSchema = NoteSchema(NoteAggregateDataSchema).merge(NoteRemoteMetadataSchema);
export const LocalNoteSchema = NoteSchema(NoteLocalDataSchema).merge(NoteLocalMetadataSchema);

export type UnauthenticatedNote = z.infer<typeof UnauthenticatedNoteSchema>;
export type AuthenticatedNote = z.infer<typeof AuthenticatedNoteSchema>;
export type AggregateNote = z.infer<typeof AggregateNoteSchema>;
export type LocalNote = z.infer<typeof LocalNoteSchema>;
