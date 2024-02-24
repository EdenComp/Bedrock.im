import {ReactElement, useEffect, useState} from 'react'
import Sidebar from "../components/Product/Sidebar.tsx";
import Markdown from "react-markdown";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import {NoteStatus} from "../types/NoteStatus.ts";
import {Note} from "../types/Note.ts";

export default function Notes(): ReactElement {
  const [actualNotes, setActualNotes] = useState("")
  const [selectedNote, setSelectedNote] = useState(-1)

  let notes: Note[] = [
    { id: 0, title: 'Note 1', status: NoteStatus.NEW, lastUpdated: new Date(), note: "This is a note 1" },
    { id: 1, title: 'Note 2', status: NoteStatus.CHANGED, lastUpdated: new Date(), note: "This is a note 2" },
    { id: 2, title: 'Note 3', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "This is a note 3" },
    { id: 3, title: 'Note 4', status: NoteStatus.NEW, lastUpdated: new Date(), note: "This is a note 4" },
    { id: 4, title: 'Note 5', status: NoteStatus.CHANGED, lastUpdated: new Date(), note: "This is a note 5" },
    { id: 5, title: 'Note 6', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "This is a note 6" },
    { id: 6, title: 'Note 7', status: NoteStatus.NEW, lastUpdated: new Date(), note: "This is a note 7" },
    { id: 7, title: 'Note 8', status: NoteStatus.CHANGED, lastUpdated: new Date(), note: "This is a note 8" },
    { id: 8, title: 'Note 9', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "This is a note 9" },
    { id: 9, title: 'Note 10', status: NoteStatus.NEW, lastUpdated: new Date(), note: "This is a note 10" },
  ]

  useEffect(() => {
    if (selectedNote != -1) {
      setActualNotes(notes[selectedNote].note)
    }
  }, [selectedNote])

  return (
    <div className="min-w-screen h-screen bg-background-1 flex flex-row">
      <div className={"w-1/5"}>
        <Sidebar notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="text-text-1 text-4xl font-semibold w-full text-center border-b border-border-1 p-4">
          Notes
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="text-text-2 text-2xl font-semibold w-full text-center p-4 border-r border-b border-border-1">
            Editor
          </div>
          <div className="text-text-2 text-2xl font-semibold w-full text-center p-4 border-l border-b border-border-1">
            Preview
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div className="text-text-2 text-2xl font-semibold w-full h-full text-center p-4 border-r border-b border-border-1 hover:bg-background-2">
            <textarea className="w-full h-full bg-background-1 text-text-2 p-4" value={actualNotes} onChange={(e) => setActualNotes(e.target.value)} />
          </div>
          <div className="text-text-2 text-2xl font-semibold w-full h-full text-center p-4 border-l border-b border-border-1 hover:bg-background-2 mx-auto max-w-1/3 overflow-y-auto">
            <Markdown className="text-left break-all px-4 py-3" remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{actualNotes}</Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}
