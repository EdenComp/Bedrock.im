import {ReactElement, useEffect, useState} from 'react'
import Sidebar from "../components/Product/Sidebar.tsx";
import {NoteMockUpStatus} from "../types/NoteMockUp.ts";
import Body from "../components/Product/Body.tsx";

export default function Notes(): ReactElement {
  const [actualNotes, setActualNotes] = useState("")
  const [selectedNote, setSelectedNote] = useState(-1)

  const [notes, setNotes] = useState([
    {
      id: 0,
      title: 'Todolist Feb',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Todo List\n- [x] Write the code\n- [ ] Write the tests\n- [ ] Document the code\n"
    },
    {
      id: 1,
      title: 'Shopping List',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Shopping List\n- [ ] Milk\n- [ ] Eggs\n- [ ] Bread\n"
    },
    {
      id: 2,
      title: 'Daily Note 12/03',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Daily Note\n- Woke up at 7:00\n- Ate breakfast\n- Went to work\n- Came home\n- Went to bed\n"
    },
    {
      id: 3,
      title: 'Meeting Notes',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Meeting Notes\n- Meeting started at 10:00\n- Meeting ended at 11:00\n- Decisions made:\n  - We will have another meeting\n  - We will have a meeting to discuss the next meeting\n"
    },
    {
      id: 4,
      title: 'Film seen',
      status: NoteMockUpStatus.CHANGED,
      lastUpdated: new Date(),
      note: "## Film seen\n- [x] The Godfather\n- [ ] The Godfather Part II\n- [ ] The Godfather Part III\n- [ ] Apocalypse Now\n- [x] The Conversation\n- [x] The Outsiders\n- [ ] Rumble Fish\n- [ ] Peggy Sue Got Married\n- [ ] Gardens of Stone\n"
    },
    {
      id: 5,
      title: 'Books to read',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Books to read\n- [ ] The Lord of the Rings\n- [ ] The Hobbit\n- [ ] The Silmarillion\n"
    },
    {
      id: 6,
      title: 'Recipes',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Recipes\n- [ ] Spaghetti\n- [ ] Lasagna\n- [ ] Pizza\n"
    },
    {
      id: 7,
      title: 'Wish list',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Wish list\n- [ ] New car\n- [ ] New house\n- [ ] New computer\n"
    },
    {
      id: 8,
      title: 'Ideas',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Ideas\n- [ ] New app\n- [ ] New website\n- [ ] New business\n"
    },
    {
      id: 9,
      title: 'Goals',
      status: NoteMockUpStatus.COMPLETE,
      lastUpdated: new Date(),
      note: "## Goals\n- [ ] Lose weight\n- [ ] Get fit\n- [ ] Get rich\n"
    }
  ])

  useEffect(() => {
    if (selectedNote != -1) {
      setActualNotes(notes[selectedNote].note)
    }
  }, [selectedNote])

  return (
    <div className="min-w-screen h-screen bg-background-1 flex flex-row">
        <Sidebar notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        <Body notes={notes} selectedNote={selectedNote} setNotes={setNotes} actualNotes={actualNotes} setActualNotes={setActualNotes} />
    </div>
  )
}
