import { ReactNode, useEffect, useRef } from "react";
import { ftml_setup } from "../ftml-utils/ftml-viewer/ftml_viewer";
import { useLeptosTunnel } from "./leptos";
import {
  set_debug_log,
  set_server_url,
} from "../ftml-utils/ftml-viewer/ftml_viewer";
import * as FLAMS from "./ftml-viewer/flams/server";

export const IS_SERVER = typeof window === "undefined";
export const Window = IS_SERVER ? undefined : window;

export const setDebugLog = set_debug_log;

declare global {
  interface Window {
    FLAMS_SERVER_URL: string;
  }
}

export function server(): FLAMS.FLAMSServer {
  return new FLAMS.FLAMSServer(Window?.FLAMS_SERVER_URL ?? "");
}

export function setServerUrl(s: string) {
  if (Window) Window.FLAMS_SERVER_URL = s;
  set_server_url(s);
}

export const FTMLSetup: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { addTunnel, TunnelRenderer } = useLeptosTunnel();

  useEffect(() => {
    if (!mountRef.current) return;
    const handle = ftml_setup(mountRef.current, (e, o) => {
      addTunnel(e, children, o);
    });
    return () => {
      handle.unmount();
    };
  }, []);

  return (
    <>
      <div ref={mountRef} style={{ display: "contents" }} />
      <TunnelRenderer />
    </>
  );
};
