import { QuizProblem, Solutions } from "../../ftml-utils";
import { ProblemResponse } from "../../ftml-utils/flams";
import { ChoiceBlock } from "../../ftml-utils/ftml-viewer/ftml-viewer-base/ftml-viewer-base";

const problem: QuizProblem = {
  html: '<div class="rustex-contents" data-ftml-problem="sets1" data-ftml-autogradable="true">\n\t<div class="rustex-paragraph rustex-withwidth"><span class="rustex-contents" data-ftml-title="">Infinite Sets</span> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div>   Which of the following <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/linguistics&amp;p=mod&amp;m=sentence-type&amp;s=statement" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">statements</span></span> are <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/epistemology&amp;p=mod&amp;m=truth&amp;s=true" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">true</span></span>? </div><div class="rustex-contents" data-ftml-multiple-choice-block="">\n\t<div class="rustex-vskip" style="height:3px;"></div>\n\t<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex-contents" data-ftml-problem-choice="">There is no <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=injective&amp;s=injective" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">injective</span></span> <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=functions&amp;s=function" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">function</span></span> from the <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=powerset&amp;s=power set" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">power set</span></span> of <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mi class="rustex-math-ord">𝑆</mi>\n\t\t</mrow></math> to the <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=set&amp;s=set" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">set</span></span> <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mi class="rustex-math-ord">𝑆</mi>\n\t\t</mrow></math>. </span></span></div>\n\t<div class="rustex-vskip" style="height:3px;"></div>\n\t<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex-contents" data-ftml-problem-choice="">The <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=powerset&amp;s=power set" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">power set</span></span> of <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mrow data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=naturalnumbers&amp;s=natural number" data-ftml-notationid=""><mrow data-ftml-comp=""><mi class="rustex-math-ord">ℕ</mi></mrow></mrow>\n\t\t</mrow></math> is <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=countable&amp;s=countable" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">countable</span></span>. </span></span></div>\n\t<div class="rustex-vskip" style="height:3px;"></div>\n\t<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex-contents" data-ftml-problem-choice="">There is a <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=bijective&amp;s=bijection" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">bijection</span></span> between <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mrow data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=naturalnumbers&amp;s=natural number" data-ftml-notationid=""><mrow data-ftml-comp=""><mi class="rustex-math-ord">ℕ</mi></mrow></mrow>\n\t\t</mrow></math> and the <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=set&amp;s=set" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">set</span></span> of <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/mv&amp;p=mod&amp;m=sequence&amp;s=finite sequence" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">finite sequences</span></span> over <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mrow data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=naturalnumbers&amp;s=natural number" data-ftml-notationid=""><mrow data-ftml-comp=""><mi class="rustex-math-ord">ℕ</mi></mrow></mrow>\n\t\t</mrow></math>. </span></span></div>\n\t<div class="rustex-vskip" style="height:3px;"></div>\n\t<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex-contents" data-ftml-problem-choice="">There is a <span class="rustex-contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=bijective&amp;s=bijection" data-ftml-notationid=""><span class="rustex-contents" data-ftml-comp="">bijection</span></span> between <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mrow data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=naturalnumbers&amp;s=natural number" data-ftml-notationid=""><mrow data-ftml-comp=""><mi class="rustex-math-ord">ℕ</mi></mrow></mrow>\n\t\t</mrow></math> and <math class="rustex-math">\n\t\t<mrow>\n\t\t\t<mrow data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=realnumbers&amp;s=real number" data-ftml-notationid=""><mrow data-ftml-comp=""><mi class="rustex-math-ord">ℝ</mi></mrow></mrow>\n\t\t</mrow></math>. </span></span></div>\n\t<div class="rustex-vskip" style="height:3px;"></div></div></div>',
  title_html: "Infinite Sets",
  uri: "https://mathhub.info?a=courses/FAU/AI/problems&p=pretest/quiz&d=sets1&l=en&e=problem",
  total_points: 5,
  preconditions: [],
  objectives: [
    [
      "Understand",
      "https://mathhub.info?a=smglom/sets&p=mod&m=powerset&s=power set",
    ],
    [
      "Understand",
      "https://mathhub.info?a=smglom/sets&p=mod&m=finite-cardinality&s=finite",
    ],
  ],
};
const solution =
  "01010100FBDC05FB6121000401503C7370616E20636C6173733D227275737465782D636F6E74656E74732220646174612D66746D6C2D70726F626C656D2D63686F6963652D766572646963743D22223E436F72726563743C2F7370616E3E00004E3C7370616E20636C6173733D227275737465782D636F6E74656E74732220646174612D66746D6C2D70726F626C656D2D63686F6963652D766572646963743D22223E57726F6E673C2F7370616E3E0001503C7370616E20636C6173733D227275737465782D636F6E74656E74732220646174612D66746D6C2D70726F626C656D2D63686F6963652D766572646963743D22223E436F72726563743C2F7370616E3E00004E3C7370616E20636C6173733D227275737465782D636F6E74656E74732220646174612D66746D6C2D70726F626C656D2D63686F6963652D766572646963743D22223E57726F6E673C2F7370616E3E00";
/*
function getProblemState(
  isFrozen: boolean,
  solution?: string,
  current_response?: ProblemResponse
): ProblemState {
  if (!isFrozen) return { type: "Interactive", current_response };
  if (!solution || !current_response)
    return { type: "Finished", current_response };
  const feedback =
    Solutions.from_jstring(solution)?.check_response(current_response);
  if (!feedback) return { type: "Finished", current_response }; // Something went wrong!!
  return { type: "Graded", feedback: feedback.to_json() };
}

export function ProblemViewer({
  problem,
  solution,
  onResponseUpdate,
  isFrozen,
  r,
}: {
  problem: QuizProblem;
  solution: string;
  onResponseUpdate?: (response: ProblemResponse) => void;
  isFrozen: boolean;
  r?: ProblemResponse;
}) {
  const problemState = getProblemState(isFrozen, solution, r);
  const { html, uri } = problem;

  return (
    <FTMLFragment
      key={uri}
      fragment={{ html, uri }}
      problemStates={new Map([[uri, problemState]])}
      onProblem={(response) => {
        onResponseUpdate?.(response);
      }}
    />
  );
}
*/
const BugPage = () => {
  const r: ProblemResponse = {
    uri: "https://mathhub.info?a=courses/FAU/AI/problems&p=pretest/quiz&d=sets1&l=en&e=problem",
    responses: [[true, false, true, false]],
  };
  const sol = Solutions.from_jstring(solution)?.to_solutions()[0] as {ChoiceBlock: ChoiceBlock};
  console.log("Solution",sol);
  const blocks = sol.ChoiceBlock.choices;
  console.log("1",blocks[0]);
  console.log("2",blocks[1]);
  console.log("3",blocks[2]);
  console.log("4",blocks[3]);
  const feedback = Solutions.from_jstring(solution)?.check_response(r);
  console.log("Feedback",feedback?.to_json());
  return (
    <div>
      {/*
      <ProblemViewer
        problem={problem}
        solution={solution}
        isFrozen={true}
        r={r}
      />*/}
    </div>
  );
};

export default BugPage;
