import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import store, { runSagas } from '@/store';

import '@solana/wallet-adapter-react-ui/styles.css';
import '@/assets/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
  // </React.StrictMode>
);

runSagas();
