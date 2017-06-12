import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './header/header';
import ShowBellmanFord from './show/show_bellman_ford';
import ShowDijkstras from './show/show_dijkstras';
import ShowFloyd from './show/show_floyd_warshall';
import Comparison from './comparison/comparison';
import AstarShow from './show/show_astar';
import Index from './index/index';
import Footer from './header/footer';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/comparison" component={Comparison} />
      <Route path="/astar" component={AstarShow} />
      <Route path="/bellman-ford" component={ShowBellmanFord} />
      <Route path="/dijkstras" component={ShowDijkstras} />
      <Route path="/floyd-warshall" component={ShowFloyd} />
      <Route path="/:error" render={() => <div className='error'><h1 className='error-page'>Page does not exist</h1></div>} />
      <Route path="/" component={Index}/>
    </Switch>
    <Footer />
  </div>
);

export default App;
