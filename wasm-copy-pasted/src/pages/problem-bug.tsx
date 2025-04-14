import { FTMLFragment, setDebugLog, setServerUrl } from "../../ftml-utils";
import { ProblemState } from "../../ftml-utils/ftml-viewer/ftml-viewer-base/ftml-viewer-base";
setServerUrl("https://mmt.beta.vollki.kwarc.info");
setDebugLog();

const html = `<div class="rustex_contents" data-ftml-problem="recursive1" data-ftml-autogradable="true">
	<div class="rustex-paragraph rustex-withwidth"><span class="rustex_contents" data-ftml-title="">Computability</span> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div> <div class="rustex-hbox-container"><div class="rustex-hbox"></div></div>     Which of the following <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/linguistics&amp;p=mod&amp;m=sentence-type&amp;s=statement" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">statements</span></span> are <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/mv&amp;p=mod&amp;m=truthvalues&amp;s=true" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">true</span></span>? </div><div class="rustex_contents" data-ftml-multiple-choice-block="">
	<div class="rustex-vskip" style="height:3px;"></div>
	<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex_contents" data-ftml-problem-choice="">Every <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/complexity&amp;p=mod&amp;m=decision-problem&amp;s=decidable" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">decidable</span></span> <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=set&amp;s=set" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">set</span></span> is <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/complexity&amp;p=mod&amp;m=recursive&amp;s=enumerable" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">recursively enumerable</span></span>. </span></span></div>
	<div class="rustex-vskip" style="height:3px;"></div>
	<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex_contents" data-ftml-problem-choice="">The <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=set&amp;s=set" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">set</span></span> of <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/computing&amp;p=mod&amp;m=program&amp;s=program" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">programs</span></span> that <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/computing&amp;p=mod&amp;m=termination&amp;s=terminate" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">terminate</span></span> for all <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/computing&amp;p=mod&amp;m=algorithm&amp;s=input" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">inputs</span></span> is <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/complexity&amp;p=mod&amp;m=decision-problem&amp;s=decidable" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">decidable</span></span>. </span></span></div>
	<div class="rustex-vskip" style="height:3px;"></div>
	<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex_contents" data-ftml-problem-choice=""><span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=ratarith&amp;s=addition" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">Addition</span></span> of <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=rationalnumbers&amp;s=rational number" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">rational numbers</span></span> is <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/complexity&amp;p=mod&amp;m=computable-function&amp;s=computable" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">computable</span></span>. </span></span></div>
	<div class="rustex-vskip" style="height:3px;"></div>
	<div class="rustex-paragraph rustex-scalewidth" style="margin-left:37.5px;--rustex-scale-width:0.93;"><span><div class="rustex-hbox-container" style="width:0;"><div class="rustex-hbox"><div class="rustex-hskip" style="margin-left:-37.5px;"></div><div class="rustex-hbox-container"><div class="rustex-hbox rustex-scalewidth" style="justify-content:space-between;--rustex-scale-width:0.06;"><span><div class="rustex-hskip" style="margin-left:0px;margin-right:auto;"></div></span></div></div><div class="rustex-hskip" style="margin-left:7.5px;"></div></div></div><span class="rustex_contents" data-ftml-problem-choice="">The <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/sets&amp;p=mod&amp;m=set&amp;s=set" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">set</span></span> of <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/mv&amp;p=mod&amp;m=sequence&amp;s=finite sequence" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">finite sequences</span></span> of <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/arithmetics&amp;p=mod&amp;m=naturalnumbers&amp;s=natural number" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">natural numbers</span></span> is not <span class="rustex_contents" data-ftml-term="OMID" data-ftml-head="https://mathhub.info?a=smglom/complexity&amp;p=mod&amp;m=recursive&amp;s=enumerable" data-ftml-notationid=""><span class="rustex_contents" data-ftml-comp="">recursively enumerable</span></span>. </span></span></div>
	<div class="rustex-vskip" style="height:3px;"></div></div></div>
`;

const BugPage = () => {
  const uri =
    "https://stexmmt.mathhub.info/:sTeX?a=courses/FAU/A…blems&p=pretest/quiz&d=recursive1&l=en&e=exercise";
  const problemState: ProblemState = {
    type: "Interactive",
    current_response: { uri, responses: [[true, true, false, false]] },
  };
  return (
    <div>
      <FTMLFragment
        key={uri}
        fragment={{ html }}
        problemStates={new Map([[uri, problemState]])}
        onProblem={(response) => {
          console.log("from wasm", JSON.stringify(response));
        }}
      />
    </div>
  );
};

export default BugPage;
