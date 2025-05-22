import { FTMLDocument, FTMLFragment,initialize } from "@kwarc/ftml-react";
import "./App.css";

await initialize("https://mathhub.info",true);

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh",overflow:"scroll" }}>
      <div style={{width:"fit-content"}}>
      <FTMLDocument
        document={{
          uri: "https://mathhub.info?a=courses/FAU/AI/course&p=course/notes&d=notes1&l=en",
          toc: "GET",
          type: "FromBackend"
        }}
      />
      <FTMLFragment
        fragment={{
          uri: "https://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_3",
          type: "FromBackend"
        }}
        onProblem={(e) => console.log(e)}
      />
      <FTMLFragment
        fragment={{
          uri: "https://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_1",
          type: "FromBackend"
        }}
      />
      </div>
    </div>
  );
}

export default App;
