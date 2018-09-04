import * as React from "react";
import routes from './routes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


function Routes() {
  return (
    <Router>
      <Switch>
        {
          routes.map((route, i) => {
            return <Route key={i} path={route.path} component={route.component}  />
          })
        }
      </Switch>
    </Router>
  );
}

export default Routes
