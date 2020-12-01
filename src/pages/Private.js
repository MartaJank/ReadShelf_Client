import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class Private extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      imageUrl: this.props.user.imageUrl,
    };
  }

  render() {
    return (
      <div>
        <div className="profile-pic-div">
          <img className="profile-pic" src={this.state.imageUrl} />
        </div>
        <div className="user-info">
          <h2 className="username">{this.state.username}</h2>
          <Link to={`/profile/${this.props.user._id}/edit`}>
            <button className="profile-edit-btn">Edit</button>
          </Link>
        </div>
        <div className="buttons-div">
          <Link to={"/bookshelf/paper"}>
            <button className="profile-btn">My Bookshelf</button>
          </Link>
          <Link to={"/tracking/pending"}>
            <button className="profile-btn">Reads Tracking</button>
          </Link>
          <Link to={`/book-clubs/${this.props.user._id}/created`}>
            <button className="profile-btn">My Book Clubs</button>
          </Link>
          <Link to={`/book-clubs/${this.props.user._id}/joined`}>
            <button className="profile-btn">Joined Book Clubs</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withAuth(Private);
