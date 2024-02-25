import { ReactElement, useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Product/Sidebar.tsx";
import Body from "../components/Product/Body.tsx";
import useNotes from "../hooks/useNotes.ts";
import { LocalNote } from "../utils/types.ts";

export default function Notes(): ReactElement {
  const [selectedNote, setSelectedNote] = useState(-1);
  const localNotes = useNotes();
  const [notes, setNotes] = useState(localNotes?.notes ?? []);

  const setNoteAtIndex = (index: number, note: LocalNote) => {
    setNotes((prevState) => {
      const result = [...prevState];
      result[index] = note;
      return result;
    });
  };

  useEffect(() => {
    if (notes && notes.length > 0 && selectedNote === -1) {
      setSelectedNote(0);
    }
  }, [notes, selectedNote]);

  useEffect(() => {
    if (selectedNote === -1) return;
    setNoteAtIndex(selectedNote, notes[selectedNote]);
  }, [selectedNote, notes]);

  const components = useMemo(() => {
    if (!notes) return <></>;

    return (
      <>
        <Sidebar notes={notes} setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        <Body
          selectedNote={selectedNote}
          currentNote={notes[selectedNote]}
          setCurrentNote={(note) => setNoteAtIndex(selectedNote, note)}
        />
      </>
    );
  }, [notes, selectedNote]);

  return <div className="min-w-screen h-screen bg-background-1 flex flex-row">{components}</div>;
}
