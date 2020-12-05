import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class ClubDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theClub: {},
      okMessage: "",
      notMessage: "",
    };
  }

  componentDidMount() {
    this.getSingleClub();
  }

  getSingleClub = () => {
    const { params } = this.props.match;
    console.log("params", params.id);
    axios
      .get(`${process.env.REACT_APP_API_URI}/private/book-clubs/${params.id}`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        const theClub = responseFromApi.data;
        this.setState({ theClub: theClub });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  joinClub = () => {
    const { params } = this.props.match;
    console.log("params", params.id);
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/private/join-club/${this.props.user._id}/${params.id}`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        console.log("club", responseFromApi);
        this.setState({ okMessage: "Club Joined" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  unjoinClub = () => {
    const { params } = this.props.match;
    console.log("params", params.id);
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/private/unjoin/${this.props.user._id}/${params.id}`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        console.log("club", responseFromApi);
        this.setState({ notMessage: "Club Unjoined" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteClub = () => {
    const { params } = this.props.match;
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/private/book-clubs/${params.id}`
      )
      .then(() => {
        this.props.history.push("/book-clubs");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { user, logout, isLoggedIn } = this.props;
    return (
      <div className="full-book">
        <div className="cover-part club">
          <img
            className="created-cover"
            src={this.state.theClub.imageUrl}
          />
          <p className="rating">{this.state.theClub.currentBookTitle}</p>
        </div>
        <div className="info-part club">
          <h3>{this.state.theClub.title}</h3>
          <hr />
          <p>DESCRIPTION</p>
          <p>{this.state.theClub.description}</p>
          <p>NEXT MEETING</p>
          <a className="meet-links" href={this.state.theClub.meetingLink}>
            <p>{this.state.theClub.meetingDate}</p>
          </a>
          <a className="meet-links" href={this.state.theClub.meetingLink}>
            <p>{this.state.theClub.meetingHour}</p>
          </a>
        </div>
        <div className="club-detail-btn">
          {this.state.theClub.creator === this.props.user._id ? (
            <div>
              <Link to={`/book-clubs/${this.state.theClub._id}/edit`}>
                <button className="add-to-list-btn">EDIT</button>
              </Link>
              <button
                className="add-to-list-btn"
                onClick={() => this.deleteClub()}
              >
                DELETE
              </button>
            </div>
          ) : (
            <div>
              <div>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.unjoinClub()}
                >
                  UNJOIN
                </button>
                <p>{this.state.notMessage}</p>
              </div>

              <div>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.joinClub()}
                >
                  JOIN
                </button>
                <p>{this.state.okMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth(ClubDetails);
