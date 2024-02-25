import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

export type MarkdownVisualiserProps = {
  rawMarkdown: string;
};

const MarkdownVisualiser: React.FC<MarkdownVisualiserProps> = ({ rawMarkdown }) => {
  return (
    <>
      <Markdown
        className="h-full text-text-2 text-2xl font-semibold text-left break-all px-4 py-3 bg-background-2 hover:bg-interactive-1 h-full rounded-lg transition-colors duration-300 focus:bg-background-2"
        remarkPlugins={[remarkGfm, remarkMath, remarkRehype]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
        {rawMarkdown}
      </Markdown>
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
          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </>
  );
};

export default MarkdownVisualiser;
