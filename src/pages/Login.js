import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    //console.log('Login -> form submit', { username, password });
    this.props.login({ email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <div className="form-div-border">
          <form className="form form-login" onSubmit={this.handleFormSubmit}>
            <label>Email:</label>
            <input
              className="form-input form-input-login"
              type="text"
              name="email"
              value={email}
              onChange={this.handleChange}
            />

            <label>Password:</label>
            <input
              className="form-input form-input-login"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

            <input className="form-btn" type="submit" value="Login" />
          </form>
          <div className="after-form after-form-login">
            <p>Don't have an account yet?</p>
            <Link className="form-link" to={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
        <div className="form-div"></div>
      </div>
    );
  }
}

export default withAuth(Login);
