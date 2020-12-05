import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class JoinedClubs extends Component {
  constructor(props) {
    super();
    this.state = {
      joinedClubs: [],
    };
  }

  getJoinedClubs = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/private/book-clubs/${this.props.user._id}/joined`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        console.log("clubs", responseFromApi);
        this.setState({
          joinedClubs: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getJoinedClubs();
  }

  render() {
    return (
      <div>
        <h5 className="clubs-title">JOINED BOOKCLUBS</h5>
        <hr className="clubs-hr" />
        {this.state.joinedClubs.map((club) => {
          return (
            <div>
              <div className="club-card">
                <h3>{club.title}</h3>
                <hr />
                <p>{club.description}</p>
                <p>Currrent book: {club.currentBookTitle}</p>
                <Link to={`/book-clubs/${club._id}`}>
                  <button className="card-btn">More info</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withAuth(JoinedClubs);
