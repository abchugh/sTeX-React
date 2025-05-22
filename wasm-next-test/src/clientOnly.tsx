'use client'

import { FTMLDocument, getFlamsServer, initialize,FTMLDocumentArgs,FTMLFragmentArgs, FTMLFragment } from "@kwarc/ftml-react";
import { useEffect, useRef, useState } from "react";

await initialize("https://mathhub.info",true);

export const ClientDocument: React.FC<FTMLDocumentArgs> = (args) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true)})
  return isClient?<FTMLDocument {...args} />:<></>;
}

export const ClientFragment: React.FC<FTMLFragmentArgs> = (args) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true)})
  return isClient?<FTMLFragment {...args} />:<></>;
}
