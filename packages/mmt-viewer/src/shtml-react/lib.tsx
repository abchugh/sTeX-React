import { ReactNode, useEffect, useRef } from "react";
import { shtml_setup } from "./shtml-viewer/shtml_viewer";
import { useLeptosTunnel } from "./leptos";


export const SHTMLSetup: React.FC<{ children: ReactNode }> = ({ children }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const {addTunnel,TunnelRenderer} = useLeptosTunnel();

    useEffect(() => {
      if (!mountRef.current) return;
      const handle = shtml_setup(mountRef.current, (e,o) => {
        addTunnel(e,children,o);
      });
      return () => {
        handle.unmount();
      };
    },[]);

    return <>
      <div ref={mountRef} style={{display:"contents"}}/>
      <TunnelRenderer/>
    </>
}
