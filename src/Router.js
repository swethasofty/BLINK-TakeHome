import React, { Component } from "react";
import { Router, Route,Switch} from "react-router-dom";
import Drugs from "./Components/Drugs";
import DrugsDetails from "./Components/DrugsDetails";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


class RouterApp extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
         <Route exact path="/" component={Drugs} />
         <Route path="/drugs/:name?" component={DrugsDetails} />
          {/* <Route path="/drugs/:drug_name?/:rxcui?/:synonym?" component={DrugsDetails} /> */}
          </Switch>
      </Router>
    );
  }
}

export default RouterApp;
