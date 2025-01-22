import { useState } from 'react'
//import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SHTMLSetup } from "./shtml-react/lib.tsx"

import * as SHTML from "./shtml-react/shtml-viewer/shtml_viewer.js";
import { TestDocument, TestFragmentA, TestFragmentB } from './shtml-react/test.tsx'

SHTML.set_debug_log();
SHTML.set_server_url("https://mmt.beta.vollki.kwarc.info");

function App() {
  return (
    <SHTMLSetup><>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite & React</h1>
      <div className="card">
        <Click/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <TestFragmentA/>
      <TestFragmentB/>
      <TestDocument/>
    </></SHTMLSetup>
  )
}

const Click: React.FC = () => {
  const [count, setCount] = useState(0)
  return <>
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
    <p>
      Edit <code>src/App.tsx</code> and save to test HMR
    </p>
  </>
}

export default App
