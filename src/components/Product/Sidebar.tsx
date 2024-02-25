import type { ReactElement } from 'react';
import NoteTree from "./Sidebar/NoteTree.tsx";
import {AggregateNote} from "../../utils/types.ts";

interface SidebarProps {
  notes: AggregateNote[],
  selectedNote: number,
  setSelectedNote: (note: number) => void
}

export default function Sidebar({ notes, selectedNote, setSelectedNote }: SidebarProps): ReactElement {
  return (
    <div className={"w-1/5"}>
      <div className="flex flex-col items-center w-1/6 bg-card bg-background-2 h-screen fixed top-0 left-0 border-r border-border-1 hover:border-border-2">
        <a href="/" className="w-full flex flex-col items-center hover:bg-interactive-1 active:bg-interactive-2 p-4 border-b border-border-1 hover:border-border-2 active:border-border-3">
          <img src="/logo-viol.png" className="h-32" alt="Bedrock Logo"/>
          <span className="self-center text-4xl font-semibold whitespace-nowrap text-text-1 pt-4">Bedrock.im</span>
        </a>
        <NoteTree notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
      </div>
    </div>
  )
}