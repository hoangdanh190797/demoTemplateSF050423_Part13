import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from '../src/store/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// precacheAndRoute(self.__WB_MANIFEST);
// registerRoute(
//   ({ url }) => url.origin === 'https://example.com' && url.pathname.endsWith('.jpg'),
//   new NetworkOnly()
// );

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

serviceWorkerRegistration.register();

reportWebVitals();
