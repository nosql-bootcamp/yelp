import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Search from "./Search";
import Business from "./Business";
import "./App.css";

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route
          path="/business/:id"
          component={routeProps => <Business {...routeProps.match.params} />}
        />
        <Route path="/" component={Search} />
      </Switch>
    </Router>
  </div>
);

export default App;
