import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from '././store/configureStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

const configStore = configureStore();

root.render(
  <Provider store={configStore}>
    <App />
  </Provider>
);
