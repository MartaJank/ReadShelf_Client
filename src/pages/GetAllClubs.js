import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class GetAllClubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfClubs: [],
    };
  }

  getAllClubs = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/private/book-clubs`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        console.log("clubs", responseFromApi);
        this.setState({
          listOfClubs: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getAllClubs();
  }

  render() {
    return (
      <div>
        <div className="created-btns club-btns">
          <Link to={"/book-clubs/club/add"}>
            <button className="club-btn">CREATE A BOOK CLUB</button>
          </Link>
          {/* <Link to={`/book-clubs/${this.props.user._id}/created`}><button className="club-btn">MY BOOKCLUBS</button></Link> */}
        </div>

        {this.state.listOfClubs.map((club) => {
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

export default withAuth(GetAllClubs);
