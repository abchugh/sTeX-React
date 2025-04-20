import { ReactNode } from "react";
import { FTMLDocument, setDebugLog, setServerUrl } from "../../ftml-utils";
setServerUrl("https://mathhub.info");
setDebugLog();

const SectionWrap: React.FC<{ uri: string; children: ReactNode }> = ({
  uri,
  children,
}) => {
  return (
    <div style={{ border: "1px solid red", margin: "1em 0", width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        <p>This is the start of a section: {uri}!</p>
      </div>
      {children}
      <div style={{ textAlign: "center" }}>
        <p>This is the end of a section!</p>
      </div>
    </div>
  );
};

const OnFragmentPage = () => {
  const uri =
    "https://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en";
  return (
    <div>
      <FTMLDocument
        document={{ uri, toc: undefined }}
        onFragment={(uri, kind) => {
              if (uri.includes('&e=section')) {
                return (ch) => <SectionWrap uri={uri}>{ch}</SectionWrap>;
              }
            }}
      />
    </div>
  );
};

export default OnFragmentPage;
