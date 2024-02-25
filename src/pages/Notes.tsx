import { ReactElement, useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Product/Sidebar.tsx";
import Body from "../components/Product/Body.tsx";
import useNotes from "../hooks/useNotes.ts";
import { NoteInput } from "../utils/types.ts";

export default function Notes(): ReactElement {
  const [input, setInput] = useState<NoteInput>({
    title: "",
    body: "",
  });
  const [selectedNote, setSelectedNote] = useState(-1);
  const notes = useNotes();

  useEffect(() => {
    if (notes?.notes && notes.notes.length > 0 && selectedNote === -1) {
      setSelectedNote(0);
    }
  }, [notes?.notes, selectedNote]);

  useEffect(() => {
    if (selectedNote != -1) {
      setInput({
        title: notes?.notes[selectedNote].data.title ?? "",
        body: notes?.notes[selectedNote].data.body ?? "",
      });
    }
  }, [selectedNote, notes?.notes]);

  const components = useMemo(() => {
    if (!notes) return <></>;

    return (
      <>
        <Sidebar notes={notes.notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        <Body notes={notes.notes} selectedNote={selectedNote} input={input} setInput={setInput} />
      </>
    );
  }, [notes, selectedNote, input]);

  return <div className="min-w-screen h-screen bg-background-1 flex flex-row">{components}</div>;
}
