import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";

import AuthProvider from "./lib/AuthProvider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import EditProfile from "./pages/EditProfile";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />

          <Switch>
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Private} />
            <PrivateRoute exact path="/profile/:id/edit" component={EditProfile} />
          </Switch>

          <Footer />
        </div>
      </AuthProvider>
    );
  }
}

export default App;
