import DisplayNoteTree from "./DisplayNoteTree.tsx";
import { LocalNote } from "../../../utils/types.ts";

interface NoteTreeProps {
  notes: LocalNote[];
  selectedNote: number;
  setSelectedNote: (note: number) => void;
}

export default function NoteTree({ notes, selectedNote, setSelectedNote }: NoteTreeProps) {
  return (
    <div className="p-4 text-text-2 w-full flex flex-col">
      {notes.map((note, idx) => (
        <DisplayNoteTree
          key={idx}
          note={note}
          index={idx}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      ))}
    </div>
  );
}
