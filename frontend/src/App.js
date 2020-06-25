import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./Category";
import Home from "./Home";
import Expenses from "./Expenses";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/login" exact={true} component={SignIn} />
          <Route path="/signup" exact={true} component={SignUp} />
          <Route path="/categories" exact={true} component={Category} />
          <Route path="/expenses" exact={true} component={Expenses} />
        </Switch>
      </Router>
    );
  }
}

export default App;
