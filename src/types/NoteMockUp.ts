export enum NoteMockUpStatus {
  NEW,
  CHANGED,
  COMPLETE,
}

export type NoteMockUp = {
  id: number,
  title: string,
  lastUpdated: Date,
  status: NoteMockUpStatus,
  note: string
}