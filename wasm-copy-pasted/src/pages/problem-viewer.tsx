import { useEffect, useState } from "react";
import {
  FTMLFragment,
  getFlamsServer,
  setDebugLog,
  setServerUrl,
} from "../../ftml-utils";
import {
  ProblemResponse,
  ProblemState,
  Solutions,
} from "../../ftml-utils/ftml-viewer/ftml-viewer-base/ftml-viewer-base";

setServerUrl("https://mathhub.info");
setDebugLog();

function getProblemState(
  isFrozen: boolean,
  solution?: string,
  current_response?: ProblemResponse
): ProblemState {
  if (!isFrozen) return { type: "Interactive", current_response };
  if (!solution) return { type: "Finished", current_response };
  const sol = Solutions.from_jstring(solution);
  const feedback = current_response
    ? sol?.check_response(current_response)
    : sol?.default_feedback();
  if (!feedback) return { type: "Finished", current_response }; // Something went wrong!!
  return { type: "Graded", feedback: feedback.to_json() };
}

function ProblemViewer({ uri, solution }: { uri: string; solution?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<ProblemResponse | undefined>(
    undefined
  );
  const problemState = getProblemState(submitted, solution, response);

  return (
    <div>
      <pre>[{JSON.stringify(problemState, null, 2)}]</pre>
      <FTMLFragment
        key={uri}
        fragment={{ uri }}
        allowHovers={submitted}
        problemStates={new Map([[uri, problemState]])}
        onProblem={(response) => {
          setResponse(response);
          console.log("onProblem", response);
        }}
      />
      <button onClick={() => setSubmitted((prev) => !prev)}>
        {submitted ? "Unsubmit" : "Submit Answer"}
      </button>
    </div>
  );
}

const OnFragmentPage = () => {
  const [solution, setSolution] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const uri =
    "https://mathhub.info?a=courses/FAU/IWGS/course&p=legal/quiz&d=cc_cc-by-nd_compatibility&l=en&e=problem";

  useEffect(() => {
    getFlamsServer()
      .solution({ uri: uri })
      .then((s) => {
        if (!s) setError("Error fetching solution");
        else setSolution(s);
      });
  }, []);

  if (error) return <div>{error}</div>;                        // <-- You can comment these two lines ...  
  if (!solution) return <div>Fetching solution...</div>;       // to proceed problem view without solution
  return <ProblemViewer uri={uri} solution={solution} />;
};

export default OnFragmentPage;
