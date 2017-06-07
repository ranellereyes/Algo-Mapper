import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

import Root from './components/root';

import { NODELIST, NODELIST2 } from './algorithms/node';
import AstarStep from './algorithms/astar_step';


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
window.a = new AstarStep(NODELIST);
