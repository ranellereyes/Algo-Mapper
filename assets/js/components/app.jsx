import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Header from './header/header';
import Show from './show/show';
import Index from './index/index';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/compare" component={() => <h1>COMPARE</h1>} />
      <Route path="/:name" component={Show} />
      <Route path="/" component={Index}/>
    </Switch>
  </div>
);

export default App;
