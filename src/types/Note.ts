import {NoteStatus} from "./NoteStatus.ts";

export type Note = {
  id: number,
  title: string,
  lastUpdated: Date,
  status: NoteStatus,
  note: string
}