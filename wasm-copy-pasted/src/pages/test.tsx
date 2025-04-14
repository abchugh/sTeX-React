import { useEffect } from "react";
import { FTMLDocument, getFlamsServer, setDebugLog, setServerUrl } from "../../ftml-utils";

setServerUrl("https://mmt.beta.vollki.kwarc.info");
setDebugLog();

const Test = () => {
  useEffect(() => {
    getFlamsServer().index().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <FTMLDocument
        document={{
          uri: "https://mathhub.info?a=courses/FAU/AI/course&p=logic/sec&d=atp1&l=en",
          toc:"GET"
        }}
      />
    </div>
  );
};

export default Test;
