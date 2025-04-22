import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FTMLDocument,
  FTMLSetup,
  setDebugLog,
  setServerUrl,
} from "../../ftml-utils";
import { getFlamsServer } from "../../ftml-utils/ftml-viewer";
import { TOCElem } from "../../ftml-utils/ftml-viewer/ftml-viewer-base/ftml-viewer-base";
setServerUrl("https://mathhub.info");
setDebugLog();

const notes =
  "https://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en";
const CourseNotesPage: NextPage = () => {
  const router = useRouter();
  const [toc, setToc] = useState<TOCElem[] | undefined>(undefined);

  useEffect(() => {
    setToc(undefined);
    getFlamsServer()
      .contentToc({ uri: notes })
      .then((v) => {
        if (!v) {
          console.error("Failed to fetch TOC");
          return;
        }
        const toc = v[1];
        console.log(toc);
        setToc(v[1]);
      });
  }, []);

  if (!toc) return <div>Loading...</div>;

  return (
    <FTMLSetup>
      {/* FTML does not update if the props (i.e., gottos) are changed.
          Therefore, we only render it when all the props are ready. 
          // Skip gottos for now. Seems to be causing rendering to be skipped*/}
      <FTMLDocument
        key={notes}
        /* TOC:{Predefined: toc} is throwing an error. */
        document={{ uri: notes, toc: { Predefined: toc } }}
      />
    </FTMLSetup>
  );
};

export default CourseNotesPage;
