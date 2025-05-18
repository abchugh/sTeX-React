import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
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
  "https://mathhub.info?a=courses/FAU/KRMT/course&p=dennis/course&d=notes&l=en";
async function getDocumentSections(notesUri: string) {
  return (await getFlamsServer().contentToc({ uri: notesUri })) ?? [[], []];
}

const FragmentWrap: React.FC<{
  uri: string;
  fragmentKind: "Section" | "Slide" | "Paragraph";
  children: ReactNode;
}> = ({ uri, fragmentKind, children }) => {
  console.log("wrap-level");
  return (
    <div fragment-uri={uri} fragment-kind={fragmentKind}>
      {children}
    </div>
  );
};
const CourseNotesPage: NextPage = () => {
  const router = useRouter();
  const [toc, setToc] = useState<TOCElem[] | undefined>(undefined);

  useEffect(() => {
    if (!notes) return;
    setToc(undefined);
    getDocumentSections(notes).then(([css, toc]) => {
      setToc(toc);
    });
  }, [router.isReady]);
  const gottos = [
    {
      uri: "https://mathhub.info?a=courses/FAU/KRMT/course&p=dennis/foundations/naive&d=index&l=en&e=section",
      timestamp: 1745920800000,
    },
    {
      uri: "https://mathhub.info?a=courses/FAU/KRMT/course&p=dennis/foundations/naive&d=index&l=en&e=section",
      timestamp: 1746525600000,
    },
    {
      uri: "https://mathhub.info?a=courses/FAU/KRMT/course&p=dennis/foundations/fol&d=semantics&l=en&e=section",
      timestamp: 1747130400000,
    },
  ];

  if (!toc) return <div>Loading...</div>;
  console.log("top-level");
  return (
    <FTMLSetup>
      <FTMLDocument
        key={notes}
        document={{ uri: notes, toc: { Predefined: toc }, gottos }}
        onFragment={(uri, kind) => {
          if (
            kind.type === "Section" ||
            kind.type === "Slide" ||   // 'Slide' also causes some jump, but only once
            kind.type === "Paragraph" // 'Paragraph' causes weird on hover of (first-fetched?) concepts  
          ) {
            return (ch) => (
              <FragmentWrap uri={uri} fragmentKind={kind.type} children={ch} />
            );
          }
        }}
      />
    </FTMLSetup>
  );
};

export default CourseNotesPage;
