import { AggregateNote } from "../../../utils/types.ts";
import Text from "../../Basic/Text.tsx";

interface DisplayNoteTreeProps {
  note: AggregateNote;
  index: number;
  selectedNote: number;
  setSelectedNote: (note: number) => void;
}

/*
const DisplayColor: Record<NoteMockUpStatus, string> = {
  [NoteMockUpStatus.NEW]: ' text-new ',
  [NoteMockUpStatus.CHANGED]: ' text-changed ',
  [NoteMockUpStatus.COMPLETE]: ' text-text-2 '
}
*/

const DisplayNoteTree = ({ note, index, selectedNote, setSelectedNote }: DisplayNoteTreeProps) => {
  return (
    <button
      onClick={() => setSelectedNote(index)}
      className="flex flex-row items-center w-full hover:bg-interactive-1 active:bg-interactive-2 p-1 text-text-2 hover:text-text-1"
    >
      {selectedNote === index && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      )}
      <Text
      /*className={DisplayColor[note.status]}> TODO */
      >
        {note.data.title.length > (selectedNote === index ? 20 : 22)
          ? note.data.title.substring(0, selectedNote === index ? 20 : 22) + "..."
          : note.data.title}
      </Text>
      {selectedNote === index && (
        <Text className="text-text-2 ml-auto text-opacity-45">{note.data.updatedAt.toLocaleDateString()}</Text>
      )}
    </button>
  );
};

export default DisplayNoteTree;
