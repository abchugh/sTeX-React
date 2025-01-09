// @ts-types="../shtml-viewer/shtml_viewer.d.ts"
import { ReactNode, useEffect, useRef } from "react";
import * as SHTML from "./shtml-viewer/shtml_viewer.js";
import { useLeptosTunnels } from "./leptos_tunnel.js";

//import { DocumentOptions, TOCOptions } from "../shtml-viewer/shtml_viewer.js";

export type DocumentOptions = { uri: string, toc?: TOC } | { html: string, toc?: TOCElem[] };
export type TOC = "GET" | TOCElem[];
export type TOCElem =  { uri:string, id:string, children:TOCElem[], kind:"section"|"input" ,title?:string };

export const SHTMLDocument: React.FC<{ 
  opt: DocumentOptions,
  on_section_begin?: (s:string) => ReactNode|undefined,
  on_section_end?: (s:string) => ReactNode|undefined
}> = ({ opt,on_section_begin, on_section_end }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const opts = to_shtml(opt);
  const {addTunnel,removeTunnel,TunnelRenderer} = useLeptosTunnels();

  useEffect(() => {
    if (!mountRef.current) return;
    const on_section_start = on_section_begin? (uri:string) => {
      const r = on_section_begin(uri);
      if (r) { return (e:HTMLDivElement) => addTunnel(e,r)}
    }:undefined;
    const on_section_end_ = on_section_end? (uri:string) => {
      const r = on_section_end(uri);
      if (r) { return (e:HTMLDivElement) => addTunnel(e,r)}
    }:undefined;
    const handle = SHTML.render_document(mountRef.current, opts,
      on_section_start,
      on_section_end_
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


function to_shtml(opt:DocumentOptions): SHTML.DocumentOptions {
  if ("uri" in opt) {
    const toc = opt.toc?to_shtml_toc(opt.toc):undefined;
    return { FromBackend: { uri: opt.uri, toc: toc } };
  } else {
    const toc = opt.toc?to_shtml_toc_ls(opt.toc):undefined;
    return { HtmlString: { html: opt.html, toc: toc } };
  }
}
function to_shtml_toc(toc:TOC): SHTML.TOCOptions {
  if (toc === "GET") {
    return "FromBackend"
  }
  return { Predefined:to_shtml_toc_ls(toc) }
}

function to_shtml_toc_ls(toc:TOCElem[]): SHTML.TOCElem[] {
  return toc.map((e) => {
    if (e.kind === "section") {
      return { Section: { title: e.title, uri: e.uri, id: e.id, children: to_shtml_toc_ls(e.children) } };
    } else {
      return { Inputref: { title: e.title, uri: e.uri, id: e.id, children: to_shtml_toc_ls(e.children) } };
    }
  });
}