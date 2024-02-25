import React, { useCallback, useContext, useState } from "react";
import MarkdownVisualiser from "../components/Product/MardownVisualiser.tsx";
import NavBar from "../components/Landing/Layout/NavBar.tsx";
import { useLocation } from "react-router-dom";
import { getNote } from "../utils/aleph.ts";
import { AlephContext } from "../context/AlephContext.tsx";

export default function Pastebim(): React.ReactElement {
  const [markdownBody, setMarkdownBody] = useState("# Loading...");
  const { hash } = useLocation();
  const alephAccount = useContext(AlephContext);

  const fetchNote = useCallback(async () => {
    if (alephAccount && hash) {
      const note = await getNote(alephAccount, hash.slice(1)).catch(() => null);
      if (!note) {
        setMarkdownBody("# Cannot find the note.");
      } else if (note.secret && note.owner !== alephAccount.address) {
        setMarkdownBody("# Cannot access the note.");
      } else if (typeof note.data === "object") {
        setMarkdownBody(note.data.body);
      } else {
        console.warn("Note data is not an object", note.data);
      }
    }
  }, [hash, alephAccount]);

  if (markdownBody === "# Loading...") {
    fetchNote();
  }

  return (
    <div className={`bg-background-1 flex h-screen w-full`}>
      <NavBar brandName={"Pasteb.im"} />
      <div className="mt-20 relative w-full p-4">
        <MarkdownVisualiser rawMarkdown={`${markdownBody}`} />
      </div>
    </div>
  );
}
