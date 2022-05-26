import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SolanaContainer from '@/containers/SolanaContainer';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store, { runSagas } from '@/store';

import '@solana/wallet-adapter-react-ui/styles.css';
import '@/assets/index.scss';

const Root = () => (
  <SolanaContainer>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </SolanaContainer>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
    <Root />
  // </React.StrictMode>
);

runSagas();
