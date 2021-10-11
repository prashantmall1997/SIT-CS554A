import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Account from "./Account";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import Landing from "./Landing";
import Navigation from "./Navigation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navigation></Navigation>
        </header>
      </div>
      <Route exact path="/" component={Landing}></Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/account" component={Account}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/changepassword" component={ChangePassword}></Route>
      <Route path="/forgotpassword" component={ForgotPassword}></Route>
    </Router>
  );
}

export default App;
