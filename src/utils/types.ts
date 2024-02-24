export type NoteMetadata = {
  hash: string
  secret: boolean
}

export type Note = {
  content: string
} & NoteMetadata

export type ResolvedNote = {
  content: {
    title: string
    body: string
    createdAt: string
    updatedAt: string
  }
} & NoteMetadata
