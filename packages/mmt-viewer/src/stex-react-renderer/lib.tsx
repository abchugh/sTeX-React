// @ts-types="../shtml-viewer/shtml_viewer.d.ts"
import * as SHTML from "../shtml-viewer/shtml_viewer.js";
import { useEffect, useRef } from 'react';
// @ts-types="../shtml-viewer/shtml_viewer.d.ts"
import { DocumentOptions, TOCOptions } from "../shtml-viewer/shtml_viewer.js";

export const TestDocument = () => {
  SHTML.set_server_url("https://mmt.beta.vollki.kwarc.info");
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    const doc = { FromBackend: { 
      uri: "https://stexmmt.mathhub.info/:sTeX?a=sTeX/MathTutorial&p=props&d=Associative&l=en",
      toc: "FromBackend" as TOCOptions
    } } as DocumentOptions;
    const handle = SHTML.render_document(mountRef.current, doc);
    return () => {
      handle.unmount();
    };
  },[]);

  return <div ref={mountRef}/>;
}
