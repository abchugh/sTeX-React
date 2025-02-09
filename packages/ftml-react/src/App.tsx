import { useState } from 'react'
//import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FTMLSetup } from "./ftml-react/lib.tsx"

import * as FTML from "./ftml-react/lib";
import { TestDocument, TestFragmentA, TestFragmentB } from './ftml-react/test.tsx'

FTML.setDebugLog();
FTML.setServerUrl("https://mmt.beta.vollki.kwarc.info");

function App() {
  return (
    <FTMLSetup><>
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
    </></FTMLSetup>
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
