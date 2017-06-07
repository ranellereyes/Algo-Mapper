import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Astar, Node, NODELIST, NODELIST2  } from './node/node';
import BellmanFord from './node/bellman_ford';

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

window.NODELIST2 = NODELIST2;

window.NODELIST = NODELIST;
window.Node = Node;
window.Astar = Astar;
window.bell = BellmanFord;
