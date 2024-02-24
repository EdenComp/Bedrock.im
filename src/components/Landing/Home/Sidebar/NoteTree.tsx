import Text from "../../../Basic/Text.tsx";
import {NoteStatus} from "../../../../types/NoteStatus.ts";
import {Note} from "../../../../types/NoteMockUp.ts";

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
               stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
          </svg>
      }
      <Text
        className={`text-xs ${note.status === NoteStatus.NEW ? ' text-new ' : (note.status === NoteStatus.CHANGED ? ' text-changed ' : 'text-text-2')}`}>
        {note.title}
      </Text>
    </button>
  )}

interface NoteTreeProps {
  notes: Note[],
  selectedNote: number,
  setSelectedNote: (note: number) => void

}

export default function NoteTree({ notes, selectedNote, setSelectedNote }: NoteTreeProps) {
  return (
    <div className="p-4 text-text-2 w-full flex flex-col">
      {notes.map((note) => <DisplayNoteTree key={note.id} note={note} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />)}
    </div>
  )
}