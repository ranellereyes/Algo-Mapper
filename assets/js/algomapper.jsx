import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

//TESTING
import { NODELIST, NODELIST2 } from './node/node';
import { floydWarshallAlgo } from './node/floyd-warshall-algo';
import { floydWarshallAlgoSteps } from './node/floyd-warshall-algo-steps';


import Root from './components/root';

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

// ===TESTING===

window.nodelist = NODELIST2;
window.Node = Node;
window.floyd = new floydWarshallAlgo(NODELIST2);
window.f = new floydWarshallAlgoSteps(NODELIST2);
