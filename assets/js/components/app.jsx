import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './header/header';
import Show from './show/show';
import ShowBellmanFord from './show/show_bellman_ford';
import ShowDijkstras from './show/show_dijkstras';
import ShowFloyd from './show/show_floyd_warshall';
import Comparison from './comparison/comparison';
import Index from './index/index';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/comparison" component={Comparison} />
      <Route path="/bellmanford" component={ShowBellmanFord} />
      <Route path="/dijkstras" component={ShowDijkstras} />
      <Route path="/floydwarshall" component={ShowFloyd} />
      <Route path="/:name" component={Show} />
      <Route path="/" component={Index}/>
    </Switch>
  </div>
);

export default App;
