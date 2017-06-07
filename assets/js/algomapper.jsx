import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { Node, NODELIST2, NODELIST } from './node/node';
import Astar from './node/astar';
import Dijkstra from './node/dijkstra';


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


window.a = new Astar(NODELIST2);
window.b = new Dijkstra(NODELIST);
