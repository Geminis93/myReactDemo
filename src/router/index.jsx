import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routerList from './router';

class Routers extends Component {
  render() {
    return (
      <Switch>
        {
          routerList.map((item) => (
            item.children ? item.children.map((sub) => {
              return <Route
                key={sub}
                exact={!!sub.exact}
                path={sub.path}
                component={sub.component} />
            }) : <Route
              key={item}
              exact={!!item.exact}
              path={item.path}
              component={item.component} />
          ))
        }
      </Switch>
    );
  }
}

export default Routers;