import { useEffect } from "react";
import { FLAMSServer } from "../../utils/flam";
import { FTMLFragment } from "../../ftml-utils";
import { setServerUrl } from "../../ftml-utils";
const FLAMS_SERVER_URL = "https://mmt.beta.vollki.kwarc.info";
const server = new FLAMSServer(FLAMS_SERVER_URL);
setServerUrl("https://mmt.beta.vollki.kwarc.info");

const Test = () => {
  useEffect(() => {
    server.index().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <FTMLFragment
        fragment={{
          uri: "https://mathhub.info?a=sTeX/DemoExamples&d=problemtest&l=en&e=exercise_1",
        }}
      />
    </div>
  );
};

export default Test;
