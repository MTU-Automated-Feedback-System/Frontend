import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Dashboard from "./Components/Dashboard";


/*
TODO:
      - depcheck client + server to remove unused package
 */

const App = () => {

  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Dashboard} />
        </Switch>
    </Router>
  );
};

export default App;
