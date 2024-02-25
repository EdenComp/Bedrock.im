import {ReactElement, useEffect, useState} from 'react'
import Sidebar from './Sidebar.tsx';
import Markdown from "react-markdown";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import {NoteStatus} from "../../../types/NoteStatus.ts";
import {Note} from "../../../types/Note.ts";

export default function Notes(): ReactElement {
  const [actualNotes, setActualNotes] = useState("")
  const [selectedNote, setSelectedNote] = useState(4)

  let notes: Note[] = [
    { id: 0, title: 'Todolist Feb', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Todo List\n- [x] Write the code\n- [ ] Write the tests\n- [ ] Document the code\n" },
    { id: 1, title: 'Shopping List', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Shopping List\n- [ ] Milk\n- [ ] Eggs\n- [ ] Bread\n" },
    { id: 2, title: 'Daily Note 12/03', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Daily Note\n- Woke up at 7:00\n- Ate breakfast\n- Went to work\n- Came home\n- Went to bed\n" },
    { id: 3, title: 'Meeting Notes', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Meeting Notes\n- Meeting started at 10:00\n- Meeting ended at 11:00\n- Decisions made:\n  - We will have another meeting\n  - We will have a meeting to discuss the next meeting\n" },
    { id: 4, title: 'Films seen', status: NoteStatus.CHANGED, lastUpdated: new Date(), note: "## Film seen\n- [x] The Godfather\n- [ ] The Godfather Part II\n- [ ] The Godfather Part III\n- [ ] Apocalypse Now\n- [x] The Conversation\n- [x] The Outsiders\n- [ ] Rumble Fish\n- [ ] Peggy Sue Got Married\n- [ ] Gardens of Stone\n" },
    { id: 5, title: 'Books to read', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Books to read\n- [ ] The Lord of the Rings\n- [ ] The Hobbit\n- [ ] The Silmarillion\n" },
    { id: 6, title: 'Recipes', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Recipes\n- [ ] Spaghetti\n- [ ] Lasagna\n- [ ] Pizza\n" },
    { id: 7, title: 'Wish list', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Wish list\n- [ ] New car\n- [ ] New house\n- [ ] New computer\n" },
    { id: 8, title: 'Ideas', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Ideas\n- [ ] New app\n- [ ] New website\n- [ ] New business\n" },
    { id: 9, title: 'Goals', status: NoteStatus.COMPLETE, lastUpdated: new Date(), note: "## Goals\n- [ ] Lose weight\n- [ ] Get fit\n- [ ] Get rich\n"}
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
        <div className="text-text-1 text-2xl font-semibold w-full text-center border-b border-border-1 p-4">
          Notes
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="text-text-2 text-lg font-semibold w-full text-center p-4 border-r border-b border-border-1">
            Editor
          </div>
          <div className="text-text-2 text-lg font-semibold w-full text-center p-4 border-l border-b border-border-1">
            Preview
          </div>
        </div>
        <div className="flex flex-row w-full h-full">
          <div className="text-text-2 text-lg font-semibold w-full h-full text-center p-4 border-r border-b border-border-1 hover:bg-background-2">
            <textarea className="w-full h-full bg-background-1 text-text-2 p-4 border-0 outline-0" value={actualNotes} onChange={(e) => setActualNotes(e.target.value)} />
          </div>
          <div className="text-text-2 text-lg font-semibold w-full h-full text-center p-4 border-l border-b border-border-1 hover:bg-background-2 mx-auto max-w-1/3 overflow-y-auto">
            <Markdown className="text-left break-all px-4 py-3" remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{actualNotes}</Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}
