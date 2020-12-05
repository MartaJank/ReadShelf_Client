import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class CreatedClubs extends Component {
  constructor(props) {
    super();
    this.state = {
      myClubs: [],
    };
  }

  getMyClubs = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/private/book-clubs/${this.props.user._id}/created`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        console.log("clubs", responseFromApi);
        this.setState({
          myClubs: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getMyClubs();
  }

  render() {
    return (
      <>
        <h5 className="clubs-title">MY BOOKCLUBS</h5>
        <hr className="clubs-hr" />

        {this.state.myClubs.map((club) => {
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
      </>
    );
  }
}

export default withAuth(CreatedClubs);
