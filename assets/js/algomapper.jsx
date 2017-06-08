import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

// ==TESTING==
import { NODELIST, NODELIST2 } from './node/node';
import { nodelistGenerator } from './node/node';
import { floydWarshallAlgo } from './node/floyd-warshall-algo';
window.fw = floydWarshallAlgo;
window.ng = nodelistGenerator;
window.nl = NODELIST2;

document.addEventListener('DOMContentLoaded', () => {
  let store;
  // if (window.currentUser) {
  //   const preloadedState = { session: { currentUser: window.currentUser } };
  //   store = configureStore(preloadedState);
  //   // Clean up after ourselves so we don't accidentally use the
  //   // global currentUser instead of the one in the store
  //   delete window.currentUser;
  //
  // } else {
  store = configureStore();
  // }

  window.store = store;


  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store } />, root);
});
