import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import AuthProvider from "./lib/AuthProvider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import EditProfile from "./pages/EditProfile";

import SearchBooks from "./pages/SearchBooks";
import BookDetails from "./pages/BookDetails";
import BookshelfPaper from "./pages/BookshelfPaper";
import BookshelfEbooks from "./pages/BookshelfEbooks";
import BookshelfAudiobooks from "./pages/BookshelfAudiobooks";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={SearchBooks} />
            <Route exact path="/books/:id" component={BookDetails} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Private} />
            <PrivateRoute
              exact
              path="/profile/:id/edit"
              component={EditProfile}
            />
            <PrivateRoute
              exact
              path="/bookshelf/paper"
              component={BookshelfPaper}
            />
            <PrivateRoute
              exact
              path="/bookshelf/ebook"
              component={BookshelfEbooks}
            />
            <PrivateRoute
              exact
              path="/bookshelf/audiobook"
              component={BookshelfAudiobooks}
            />
          </Switch>

          <Footer />
        </div>
      </AuthProvider>
    );
  }
}

export default App;
