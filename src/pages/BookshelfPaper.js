import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from "axios";

class BookshelfPaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperbooks: [],
    };
  }

  componentDidMount() {
    this.getPaperbooks();
  }

  getPaperbooks = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/private/user/info/${this.props.user._id}`
      )
      .then((response) => {
        console.log("response paper", response.data.paperBooksAPI);
        let paperData = response.data.paperBooksAPI;
        this.setState({ paperbooks: paperData });
      });
  };

  render() {
    return (
      <div>
        <div className="bksh-btns">
          <Link to={`/bookshelf/paper`}>
            <button className="profile-btn">Paper</button>
          </Link>
          <Link to={`/bookshelf/ebook`}>
            <button className="profile-btn">Ebooks</button>
          </Link>
          <Link to={`/bookshelf/audiobook`}>
            <button className="profile-btn">Audiobooks</button>
          </Link>
        </div>
        <div className="shown-books">
          {this.state.paperbooks.map((book) => {
            return (
              <div className="book-show">
                {book.volumeInfo.imageLinks.thumbnail ? (
                  <Link to={`/books/${book.id}`}>
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt="Foto libro"
                    />
                  </Link>
                ) : (
                  <Link to={`/books/${book.id}`}>
                    <img
                      src={book.volumeInfo.imageLinks.medium}
                      alt="Foto libro"
                    />
                  </Link>
                )}
                <Link
                  to={`/books/${book.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p>{book.volumeInfo.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(BookshelfPaper);
