import { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Product/Sidebar.tsx";
import Body from "../components/Product/Body.tsx";
import useNotes from "../hooks/useNotes.ts";
import { LocalNote } from "../utils/types.ts";
import { getNote } from "../utils/aleph.ts";
import { AlephContext } from "../context/AlephContext.tsx";

export default function Notes(): ReactElement {
  const [selectedNote, setSelectedNote] = useState(-1);
  const localNotes = useNotes();
  const alephAccount = useContext(AlephContext);
  const [notes, setNotes] = useState(localNotes?.notes ?? []);

  useEffect(() => {
    if (localNotes?.notes) {
      setNotes(localNotes.notes);
    }
  }, [localNotes?.notes]);

  const setNoteAtIndex = (index: number, note: LocalNote) => {
    setNotes((prevState) => {
      const result = [...prevState];
      result[index] = note;
      return result;
    });
  };

  const fetchBody = useCallback(
    async (note: LocalNote, index: number) => {
      if (!alephAccount || !note.hash) return;
      const fetchedNote = await getNote(alephAccount, note.hash).catch(() => null);

      if (!fetchedNote) {
        console.error("Failed to fetch note body");
        return;
      }
      setNotes((prevState) => {
        const result = [...prevState];
        if (typeof fetchedNote.data === "object") {
          result[index].data.body = fetchedNote.data.body;
        }
        return result;
      });
      setSelectedNote(index);
    },
    [alephAccount],
  );

  useEffect(() => {
    if (selectedNote !== -1 && !notes[selectedNote].data.body) {
      fetchBody(notes[selectedNote], selectedNote);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (notes && notes.length > 0 && selectedNote === -1) {
      setSelectedNote(0);
    }
  }, [notes, selectedNote]);

  const components = useMemo(() => {
    if (!notes) return <></>;

    return (
      <>
        <Sidebar notes={notes} setNotes={setNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        <Body
          selectedNote={selectedNote}
          currentNote={notes[selectedNote] ?? null}
          setCurrentNote={(note) => setNoteAtIndex(selectedNote, note)}
        />
      </>
    );
  }, [notes, selectedNote]);

  return <div className="min-w-screen h-screen bg-background-1 flex flex-row">{components}</div>;
}
