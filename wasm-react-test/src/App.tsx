import { FTMLDocument, FTMLFragment, setServerUrl } from "@kwarc/ftml-react";
import "./App.css";

setServerUrl("https://mmt.beta.vollki.kwarc.info");
function App() {
  return (
    <>
      <FTMLDocument
        document={{
          uri: "https://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en",
          toc: "GET",
        }}
      />
      <FTMLFragment
        fragment={{
          uri: "https://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_3",
        }}
        exercises={(e) => console.log(e)}
      />
      <FTMLFragment
        fragment={{
          uri: "https://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_1",
        }}
      />
    </>
  );
}

export default App;
