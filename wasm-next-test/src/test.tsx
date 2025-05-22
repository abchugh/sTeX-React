"use client"

import { getFlamsServer, initialize } from "@kwarc/ftml-react";
import { useEffect } from "react";
import { ClientDocument } from "./clientOnly";

initialize("https://mathhub.info",true);

const Test = () => {
  useEffect(() => {
    getFlamsServer().index().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <ClientDocument
        document={{
          uri: "https://mathhub.info?a=courses/FAU/AI/course&p=game-play/slides&d=alphago-now&l=en",
          toc:"GET",
          type:"FromBackend"
        }}
      />
    </div>
  );
};

export default Test;
