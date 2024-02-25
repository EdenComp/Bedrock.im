import { ReactElement, useEffect, useState } from "react";
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
    if (notes?.aggregateNotes && selectedNote === -1) {
      setSelectedNote(0);
    }
  }, []);

  useEffect(() => {
    if (selectedNote != -1) {
      setInput({
        title: notes?.aggregateNotes[selectedNote].data.title ?? "",
        body: "",
        // TODO: body: notes?.aggregateNotes[selectedNote].body ?? "",
      });
    }
  }, [selectedNote]);

  return (
    <div className="min-w-screen h-screen bg-background-1 flex flex-row">
      {notes !== null && (
        <>
          <Sidebar notes={notes.aggregateNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
          <Body notes={notes.aggregateNotes} selectedNote={selectedNote} input={input} setInput={setInput} />
        </>
      )}
    </div>
  );
}
