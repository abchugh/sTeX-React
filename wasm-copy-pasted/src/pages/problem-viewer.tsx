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
  const sol = Solutions.from_jstring(solution.replace(/^"|"$/g, ""));
  const feedback = current_response
    ? sol?.check_response(current_response)
    : sol?.default_feedback();
  if (!feedback) return { type: "Finished", current_response }; // Something went wrong!!
  return { type: "Graded", feedback: feedback.to_json() };
}

function UriProblemViewer({ uri }: { uri: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<ProblemResponse | undefined>(
    undefined
  );
  const [solution, setSolution] = useState<string | undefined>(undefined);

  useEffect(() => {
    getFlamsServer().solution({ uri }).then(setSolution);
  }, []);
  const problemState = getProblemState(submitted, solution, response);

  return (
    <div>
      <FTMLFragment
        key={`${uri}-${problemState.type}`}
        fragment={{ uri }}
        allowHovers={submitted}
        problemStates={new Map([[uri, problemState]])}
        onProblem={(response) => {
          setResponse(response);
        }}
      />
      <button onClick={() => setSubmitted(true)} disabled={submitted}>
        Submit Answer
      </button>
      <br />
      <pre>[{JSON.stringify(problemState, null, 2)}]</pre>
    </div>
  );
}

const OnFragmentPage = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const uri =
    "https://mathhub.info?a=courses/FAU/IWGS/course&p=legal/quiz&d=cc_cc-by-nd_compatibility&l=en&e=problem";

  return <UriProblemViewer uri={uri} />;
};

export default OnFragmentPage;
