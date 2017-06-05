import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './header/header';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/compare" component={() => <h1>COMPARE</h1>} />
      <Route path="/:name" component={() => <h1>ALGO</h1>} />
      <Route path="/" component={() => <h1>INDEX</h1>} />
    </Switch>
  </div>
);

export default App;
