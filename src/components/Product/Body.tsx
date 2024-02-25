import type { ReactElement } from "react";
import MarkdownVisualiser from "./MardownVisualiser.tsx";
import { LocalNote } from "../../utils/types.ts";

interface BodyProps {
  selectedNote: number;
  currentNote: LocalNote | null;
  setCurrentNote: (note: LocalNote) => void;
}

export default function Body({ selectedNote, currentNote, setCurrentNote }: BodyProps): ReactElement {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-text-1 text-4xl font-semibold w-full text-center border-b border-border-1 p-4">
        <input
          type="text"
          className="w-full text-center p-2 bg-interactive-1 text-text-2 outline-0 border-0 rounded-lg hover:bg-interactive-2 focus:bg-interactive-3 transition-colors duration-300"
          value={currentNote?.data.title ?? "Select a note"}
          disabled={selectedNote === -1}
          onChange={({ target: { value } }) => {
            if (!currentNote) return;
            setCurrentNote({
              ...currentNote,
              data: {
                ...currentNote.data,
                title: value,
              },
              status: currentNote.status === "saved" ? "modified" : currentNote.status,
            });
          }}
        />
      </div>

      <div className="flex flex-row w-full h-full">
        <div className="relative text-text-2 text-2xl font-semibold w-full h-full text-center p-4 border-r border-b border-border-1 transition-colors duration-300 ">
          <textarea
            disabled={selectedNote === -1}
            className="w-full h-full bg-background-2 hover:bg-interactive-1 text-text-2 p-4 outline-0 border-0 rounded-lg resize-none transition-colors duration-300 focus:bg-background-2"
            value={currentNote?.data.body ?? ""}
            onChange={({ target: { value } }) => {
              if (!currentNote) return;
              setCurrentNote({
                ...currentNote,
                data: {
                  ...currentNote.data,
                  body: value,
                },
                status: currentNote.status === "saved" ? "modified" : currentNote.status,
              });
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 absolute top-6 right-6 text-text-2 text-opacity-35 hover:text-opacity-100 transition-colors duration-300 hover:bg-interactive-1 hover:bg-opacity-100 rounded-lg p-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>
        <div className="relative w-full h-full p-4 border-l border-b border-border-1 mx-auto max-w-1/3 overflow-y-auto transition-colors duration-300">
          <MarkdownVisualiser rawMarkdown={currentNote?.data.body ?? ""} />
        </div>
      </div>
    </div>
  );
}
