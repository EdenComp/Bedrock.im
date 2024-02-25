import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from 'rehype-raw'
import remarkRehype from "remark-rehype";
import type { ReactElement } from "react";
import {AggregateNote, NoteInput} from "../../utils/types.ts";

interface BodyProps {
  notes: AggregateNote[],
  selectedNote: number,
  input: NoteInput,
  setInput: (input: NoteInput) => void
}

export default function Body({ notes, selectedNote, input, setInput }: BodyProps): ReactElement {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="text-text-1 text-4xl font-semibold w-full text-center border-b border-border-1 p-4">
        <input
          type="text"
          className="w-full text-center p-2 bg-interactive-1 text-text-2 outline-0 border-0 rounded-lg hover:bg-interactive-2 focus:bg-interactive-3 transition-colors duration-300"
          value={notes[selectedNote]?.data.title ?? "Select a note"}
          disabled={selectedNote === -1}
          onChange={() => setInput({
            ...input,
            title: notes[selectedNote]?.data.title ?? "",
          })}
        />
      </div>

      <div className="flex flex-row w-full h-full">
        <div
          className="relative text-text-2 text-2xl font-semibold w-full h-full text-center p-4 border-r border-b border-border-1 transition-colors duration-300 ">
            <textarea
              disabled={selectedNote === -1}
              className="w-full h-full bg-background-2 hover:bg-interactive-1 text-text-2 p-4 outline-0 border-0 rounded-lg resize-none transition-colors duration-300 focus:bg-background-2"
              value={input.body} onChange={(e) => setInput({
                ...input,
                title: e.target.value,
              })}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor"
               className="w-10 h-10 absolute top-6 right-6 text-text-2 text-opacity-35 hover:text-opacity-100 transition-colors duration-300 hover:bg-interactive-1 hover:bg-opacity-100 rounded-lg p-2">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
          </svg>
        </div>
        <div
          className="relative text-text-2 text-2xl font-semibold w-full h-full text-center p-4 border-l border-b border-border-1  mx-auto max-w-1/3 overflow-y-auto transition-colors duration-300">
          <Markdown
            className="text-left break-all px-4 py-3 bg-background-2 hover:bg-interactive-1 h-full rounded-lg transition-colors duration-300 focus:bg-background-2"
            remarkPlugins={[remarkGfm, remarkMath, remarkRehype]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}>{input.body}</Markdown>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor"
               className="w-10 h-10 absolute top-6 right-6 text-text-2 text-opacity-35 hover:text-opacity-100 transition-colors duration-300 hover:bg-interactive-1 hover:bg-opacity-100 rounded-lg p-2">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}