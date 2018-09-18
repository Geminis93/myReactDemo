import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';

export default () => (
  <Router>
    <Switch>
      <Route path="/app" component={App} />
      <Redirect from="/" to="/app" />
    </Switch>
  </Router>
)