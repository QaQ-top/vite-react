import React, { useState } from 'react';
import logo from '@assets/images/logo.svg';
import Styles from './style.module.less';
import wags from '@assets/other/app.wasm';
import config from './index.json';


function App() {
  const [count, setCount] = useState(0);
  console.log(config, window.v_global);
  wags({
    env: {
      abort: () => {
        console.log('FFFF')
      }
    },
  }).then(res => {
    console.log(res.buffer)
  }).catch((err) => {
    console.log(err)
  });
  return (
    <div className={Styles.App}>
      <header className={Styles.App_header}>
        <img src={logo} className={Styles.App_logo} alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <></>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className={Styles.App_link}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className={Styles.App_link}
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
