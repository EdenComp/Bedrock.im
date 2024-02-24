import React, {useState} from 'react';
import Text from "../../Basic/Text.tsx";
import {NoteStatus} from "../../../types/NoteStatus.ts";

type Note = {
  id: number,
  title: string,
  lastUpdated: Date,
  status: NoteStatus,
}

interface DisplayNoteTreeProps {
  note: Note,
  selectedNote: number,
  setSelectedNote: (note: number) => void
}

const DisplayNoteTree = ({ note, selectedNote, setSelectedNote }: DisplayNoteTreeProps) => {
  return (
    <button onClick={(): void => setSelectedNote(note.id)} className="flex flex-row items-center w-full hover:bg-interactive-1 active:bg-interactive-2 p-1 text-text-2 hover:text-text-1">
      {selectedNote === note.id &&
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
          </svg>
      }
      <Text
        className={`${note.status === NoteStatus.NEW ? ' text-new ' : (note.status === NoteStatus.CHANGED ? ' text-changed ' : 'text-text-2')}`}>
        {note.title}
      </Text>
      {selectedNote === note.id && <Text className="text-text-2 ml-auto text-opacity-45">
        {note.lastUpdated.toLocaleString()}
      </Text>}
    </button>
  )}

export default function NoteTree() {
  const [selectedNote, setSelectedNote] = useState(-1)

  const notes: Note[] = [
    { id: 1, title: 'Note 1', status: NoteStatus.NEW, lastUpdated: new Date() },
    { id: 2, title: 'Note 2', status: NoteStatus.CHANGED, lastUpdated: new Date()  },
    { id: 3, title: 'Note 3', status: NoteStatus.COMPLETE, lastUpdated: new Date()  },
    { id: 4, title: 'Note 4', status: NoteStatus.NEW, lastUpdated: new Date()  },
    { id: 5, title: 'Note 5', status: NoteStatus.CHANGED, lastUpdated: new Date()  },
    { id: 6, title: 'Note 6', status: NoteStatus.COMPLETE, lastUpdated: new Date()  },
    { id: 7, title: 'Note 7', status: NoteStatus.NEW, lastUpdated: new Date()  },
    { id: 8, title: 'Note 8', status: NoteStatus.CHANGED, lastUpdated: new Date()  },
    { id: 9, title: 'Note 9', status: NoteStatus.COMPLETE, lastUpdated: new Date()  },
    { id: 10, title: 'Note 10', status: NoteStatus.NEW, lastUpdated: new Date()  },
  ]
  return (
    <div className="p-4 text-text-2 w-full flex flex-col">
      {notes.map((note) => <DisplayNoteTree key={note.id} note={note} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />)}
    </div>
  )
}