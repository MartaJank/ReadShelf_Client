import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="navbar">
        <nav role="navigation">
          <div id="menuToggle">
            <input type="checkbox" />

            <span></span>
            <span></span>
            <span></span>

            {this.props.user ? (
              <ul id="menu">
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/profile"}>
                  <li>Profile</li>
                </Link>
                <Link to={"/books"}>
                  <li>Find Books</li>
                </Link>
                <Link to={"/book-clubs"}>
                  <li>Book Clubs</li>
                </Link>
                <Link to={"/faq"}>
                  <li>FAQ</li>
                </Link>
                <Link to={"/"}>
                  <button onClick={logout}>Log Out</button>
                </Link>
              </ul>
            ) : (
              <ul id="menu">
                <Link to={"/"}>
                  <li>Home</li>
                </Link>
                <Link to={"/login"}>
                  <li>Log In</li>
                </Link>
                <Link to={"/signup"}>
                  <li>Sign Up</li>
                </Link>
                <Link to={"/books"}>
                  <li>Find Books</li>
                </Link>
                <Link to={"/book-clubs"}>
                  <li>Book Clubs</li>
                </Link>
                <Link to={"/faq"}>
                  <li>FAQ</li>
                </Link>
              </ul>
            )}
          </div>
        </nav>
        <div>
          <img
            className="nav-logo"
            src="https://res.cloudinary.com/martajank/image/upload/v1598511845/Logo_ngj48v.png"
          />
        </div>
      </div>
    );
  }
}

export default withAuth(Navbar);
