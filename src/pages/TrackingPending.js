import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class TrackingPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
    };
  }

  componentDidMount() {
    this.getPendingBooks();
  }

  getPendingBooks = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/private/user/info/${this.props.user._id}`
      )
      .then((data) => {
        let pendingData = data.data.pendingBooksAPI;
        this.setState({ pending: pendingData });
      });
  };

  render() {
    return (
      <div>
        <div className="bksh-btns">
          <Link to={`/tracking/pending`}>
            <button className="profile-btn">Pending</button>
          </Link>
          <Link to={`/tracking/progress`}>
            <button className="profile-btn">In Progress</button>
          </Link>
          <Link to={`/tracking/read`}>
            <button className="profile-btn">Read</button>
          </Link>
        </div>
        <div className="shown-books">
          {this.state.pending.map((data) => {
            return (
              <div className="book-show">
                {data.volumeInfo.imageLinks.thumbnail ? (
                  <Link to={`/books/${data.id}`}>
                    <img
                      src={data.volumeInfo.imageLinks.thumbnail}
                      alt="Foto libro"
                    />
                  </Link>
                ) : (
                  <Link to={`/books/${data.id}`}>
                    <img
                      src={data.volumeInfo.imageLinks.medium}
                      alt="Foto libro"
                    />
                  </Link>
                )}
                <Link
                  to={`/books/${data.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p>{data.volumeInfo.title}</p>
                </Link>

                {console.log(data)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(TrackingPending);
