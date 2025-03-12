import { useEffect } from "react";
import { FLAMSServer } from "../../utils/flam";
import { FTMLDocument, getFlamsServer } from "../../ftml-utils";
import { setServerUrl } from "../../ftml-utils";

setServerUrl("https://mmt.beta.vollki.kwarc.info");

const Test = () => {
  useEffect(() => {
    getFlamsServer().index().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <FTMLDocument
        document={{
          uri: "https://mathhub.info?a=courses/FAU/AI/course&p=game-play/slides&d=alphago-now&l=en",
          toc:"GET"
        }}
      />
    </div>
  );
};

export default Test;
