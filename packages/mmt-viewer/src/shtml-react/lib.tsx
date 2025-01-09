import { SHTMLDocument } from "./documents";

export const TestDocument = () => {
  return <SHTMLDocument 
    opt={{
      uri:"https://stexmmt.mathhub.info/:sTeX?a=sTeX/MathTutorial&d=textbook&l=en",
      toc:"GET"
    }}
    on_section_begin={(uri:string) => {
      return <SectionStart sec={uri}/>
    }}
    on_section_end={(uri:string) => {
      return <SectionEnd sec={uri}/>
    }}
  />
}

export const SectionStart: React.FC<{sec:string}> = ({sec}) => {
  return <div style={{textAlign:"center"}}><p>This is the start of a section: {sec}!</p></div>
}
export const SectionEnd: React.FC<{sec:string}> = ({sec}) => {
  return <div style={{textAlign:"center"}}><p>This is the end of a section: {sec}!</p></div>
}


/*
// @ts-types="../shtml-viewer/shtml_viewer.d.ts"
import * as SHTML from "./shtml-viewer/shtml_viewer.js";
import { useEffect, useRef } from 'react';
// @ts-types="../shtml-viewer/shtml_viewer.d.ts"
import { DocumentOptions, TOCOptions } from "./shtml-viewer/shtml_viewer.js";

export const TestDocument = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  //const [get_sects,set_sects] = useState<HTMLElement[]>([]);
  useEffect(() => {
    if (!mountRef.current) return;
    const doc = { FromBackend: { 
      uri: "https://stexmmt.mathhub.info/:sTeX?a=sTeX/MathTutorial&d=textbook&l=en",
      toc: "FromBackend" as TOCOptions
    } } as DocumentOptions;
    const handle = SHTML.render_document(mountRef.current, doc);
    return () => {
      handle.unmount();
    };
  },[]);
  return <div style={{textAlign:"start"}}>
    <div ref={mountRef}/>
  </div>;
}
*/