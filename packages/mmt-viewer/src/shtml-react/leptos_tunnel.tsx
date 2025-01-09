import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface Tunnel {
  element: Element;
  node: ReactNode;
  id: string; // for React keys
}

export function useLeptosTunnels() {
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);

  const addTunnel = (element: Element, node: ReactNode) => {
    const id = Math.random().toString(36).slice(2);
    setTunnels(prev => [...prev, { element, node, id }]);
    return id; // Return id for later removal
  };

  const removeTunnel = (id: string) => {
    setTunnels(prev => prev.filter(tunnel => tunnel.id !== id));
  };

  const TunnelRenderer = () => (
    <>
      {tunnels.map(tunnel => 
        createPortal(tunnel.node, tunnel.element, tunnel.id)
      )}
    </>
  );

  return {
    addTunnel,
    removeTunnel,
    TunnelRenderer
  };
}
