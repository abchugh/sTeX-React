// @ts-types="../shtml-viewer/shtml_viewer.d.ts"
import { ReactNode, useContext, useEffect, useRef } from "react";
import * as SHTML from "./shtml-viewer/shtml_viewer.js";
import { SHTMLContext, useLeptosTunnels } from "./leptos.js";

//import { DocumentOptions, TOCOptions } from "../shtml-viewer/shtml_viewer.js";

export type DocumentOptions = { uri: string, toc?: TOC } | { html: string, toc?: TOCElem[] };
export type FragmentOptions = { uri:string } | {html:string, uri?:string };
export type TOC = "GET" | TOCElem[];
export type TOCElem =  { uri:string, id:string, children:TOCElem[], kind:"section"|"input" ,title?:string };

export type ExerciseOptions = {graded:[string,SHTML.ExerciseFeedback][]} | {withSolutions:[string,SHTML.Solutions][]} | {onEvent:((r:SHTML.ExerciseResponse) => void)};

export const SHTMLDocument: React.FC<{ 
  opt: DocumentOptions,
  onSectionBegin?: (s:string) => ReactNode|undefined,
  onSectionEnd?: (s:string) => ReactNode|undefined
}> = ({ opt,onSectionBegin, onSectionEnd }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const opts = docToShtml(opt);
  const {addTunnel,TunnelRenderer} = useLeptosTunnels();
  const context = useContext(SHTMLContext);

  useEffect(() => {
    if (!mountRef.current) return;
    const on_section_start = onSectionBegin? (uri:string) => {
      const r = onSectionBegin(uri);
      if (r) { return (e:HTMLDivElement,o:SHTML.LeptosContext) => 
        addTunnel(e,r,o)}
    }:undefined;
    const on_section_end = onSectionEnd? (uri:string) => {
      const r = onSectionEnd(uri);
      if (r) { return (e:HTMLDivElement,o:SHTML.LeptosContext) => 
        addTunnel(e,r,o)}
    }:undefined;
    const handle = SHTML.render_document(mountRef.current, opts,
      on_section_start,
      on_section_end,
      context
    );
    return () => {
      handle.unmount();
    };
  },[]);
  
  return <div style={{textAlign:"start"}}>
    <div ref={mountRef}/>
    <TunnelRenderer/>
  </div>;
}


export const SHTMLFragment: React.FC<{ opt: FragmentOptions, ex?:ExerciseOptions }> = ({ opt,ex }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const opts = fragmentToShtml(opt);
  const context = useContext(SHTMLContext);

  useEffect(() => {
    if (!mountRef.current) return;
    let handle;
    if (ex) {
      if ("graded" in ex) {
        handle = SHTML.render_fragment(mountRef.current, opts,
          context,
          {WithFeedback:ex.graded}
        );
      } else if ("withSolutions" in ex) {
        handle = SHTML.render_fragment(mountRef.current, opts,
          context,
          {WithSolutions:ex.withSolutions}
        );
      } else {
        handle = SHTML.render_fragment_with_cont(mountRef.current, opts,context,ex.onEvent);
      } 
    } else {
      handle = SHTML.render_fragment(mountRef.current, opts,
        context
      );
    }
    
    return () => {
      handle.unmount();
    };
  },[]);
  
  return <div style={{textAlign:"start"}}>
    <div ref={mountRef}/>
  </div>;
}

function fragmentToShtml(opt:FragmentOptions): SHTML.FragmentOptions {
  if ("html" in opt) {
    return { HtmlString: { html: opt.html, uri: opt.uri } };
  } else {
    return { FromBackend: { uri: opt.uri } };
  }
}

function docToShtml(opt:DocumentOptions): SHTML.DocumentOptions {
  if ("uri" in opt) {
    const toc = opt.toc?tocToShtml(opt.toc):undefined;
    return { FromBackend: { uri: opt.uri, toc: toc } };
  } else {
    const toc = opt.toc?tocLsToShtml(opt.toc):undefined;
    return { HtmlString: { html: opt.html, toc: toc } };
  }
}
function tocToShtml(toc:TOC): SHTML.TOCOptions {
  if (toc === "GET") {
    return "FromBackend"
  }
  return { Predefined:tocLsToShtml(toc) }
}

function tocLsToShtml(toc:TOCElem[]): SHTML.TOCElem[] {
  return toc.map((e) => {
    if (e.kind === "section") {
      return { Section: { title: e.title, uri: e.uri, id: e.id, children: tocLsToShtml(e.children) } };
    } else {
      return { Inputref: { title: e.title, uri: e.uri, id: e.id, children: tocLsToShtml(e.children) } };
    }
  });
}