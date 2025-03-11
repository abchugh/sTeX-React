import { ReactNode, useState } from "react";
import { FTMLDocument, FTMLFragment } from "@kwarc/ftml-react";

export const TestDocument = () => {
  return (
    <FTMLDocument
      document={{
        uri: "https://stexmmt.mathhub.info/:sTeX?a=sTeX/MathTutorial&d=textbook&l=en",
        toc: "GET",
      }}
      onSection={(uri, _) => (ch) => <SectionWrap uri={uri}>{ch}</SectionWrap>}
      onSectionTitle={(uri, _lvl) => <SectionTitle sec={uri} />}
    />
  );
};

const SectionTitle: React.FC<{ sec: string }> = ({ sec }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Here's a clicker thingy for {sec}:</p>
      <Click />
    </div>
  );
};

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

export const TestFragmentA = () => {
  return (
    <>
      <p>Multiple Choice:</p>
      <FTMLFragment
        fragment={{
          uri: "https://stexmmt.mathhub.info/:sTeX?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_1",
        }}
      />
    </>
  );
};

export const TestFragmentB = () => {
  return (
    <>
      <p>Fillinsol (logs typing):</p>
      <FTMLFragment
        fragment={{
          uri: "https://stexmmt.mathhub.info/:sTeX?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_3",
        }}
        exercises={(e) => console.log(e)}
      />
    </>
  );
};

const Click: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>Foo Bar</p>
    </>
  );
};
