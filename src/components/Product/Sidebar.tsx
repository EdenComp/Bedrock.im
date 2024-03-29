import { ReactElement, useCallback, useContext } from "react";
import NoteTree from "./Sidebar/NoteTree.tsx";
import { AggregateNote, LocalNote } from "../../utils/types.ts";
import { AlephContext } from "../../context/AlephContext.tsx";
import { createNote, updateNote } from "../../utils/aleph.ts";

interface SidebarProps {
  notes: LocalNote[];
  selectedNote: number;
  setNotes: (value: ((prevState: LocalNote[]) => LocalNote[]) | LocalNote[]) => void;
  setSelectedNote: (value: ((prevState: number) => number) | number) => void;
}

export default function Sidebar({ notes, selectedNote, setNotes, setSelectedNote }: SidebarProps): ReactElement {
  const alephAccount = useContext(AlephContext);

  const saveNote = useCallback(async () => {
    const currentNote = notes[selectedNote];
    if (!alephAccount || currentNote.status === "saved") return;

    let hash = currentNote.hash;
    try {
      if (currentNote.status === "modified") {
        await updateNote(alephAccount, notes[selectedNote]);
      } else {
        hash = await createNote(
          alephAccount,
          notes.filter((note) => note.hash !== undefined) as AggregateNote[],
          notes[selectedNote],
        );
      }
      setNotes((prevState) => {
        const result = [...prevState];
        result[selectedNote] = {
          ...result[selectedNote],
          status: "saved",
          hash,
        };
        return result;
      });
    } catch (e) {
      console.error(e);
    }
  }, [alephAccount, notes, selectedNote, setNotes]);

  if (!alephAccount) return <></>;

  return (
    <div className="w-1/5 relative">
      <div className="flex flex-col items-center w-1/6 bg-card bg-background-2 h-screen fixed top-0 left-0 border-r border-border-1 hover:border-border-2">
        <a
          href="/"
          className="w-full flex flex-col items-center hover:bg-interactive-1 active:bg-interactive-2 p-4 border-b border-border-1 hover:border-border-2 active:border-border-3"
        >
          <img src="/logo-viol.png" className="h-32" alt="Bedrock Logo" />
          <span className="self-center text-4xl font-semibold whitespace-nowrap text-text-1 pt-4">Bedrock.im</span>
        </a>
        <NoteTree notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      </div>
      <div>
        <button
          onClick={() =>
            setNotes((prevState) => [
              ...prevState,
              {
                data: {
                  title: "New Note",
                  updatedAt: new Date(),
                  body: "",
                },
                status: "draft",
                secret: false,
                hash: undefined,
                owner: alephAccount.address,
              },
            ])
          }
          className="bg-card text-text-1 p-4 rounded-lg mb-20 w-1/4 mx-auto transition-colors duration-300 hover:shadow-lg bg-interactive-1 hover:bg-interactive-2 active:bg-interactive-3 border border-border-1 hover:border-border-2 active:border-border-3 absolute -bottom-12 left-12"
        >
          New
        </button>
        <button
          onClick={saveNote}
          disabled={selectedNote === -1 || notes[selectedNote].status === "saved"}
          className="bg-card text-text-1 p-4 rounded-lg mb-20 w-1/4 mx-auto transition-colors duration-300 hover:shadow-lg bg-interactive-1 hover:bg-interactive-2 active:bg-interactive-3 border border-border-1 hover:border-border-2 active:border-border-3 absolute -bottom-12 right-12"
        >
          Save
        </button>
      </div>
    </div>
  );
}
