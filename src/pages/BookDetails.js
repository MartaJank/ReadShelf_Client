import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theBook: {},
      okMessage: "",
      removedMessage: "",
      BooksList: [],
    };
  }

  componentDidMount() {
    this.getBook();
    this.getTheBooks();
  }

  getBook = () => {
    const { params } = this.props.match;
    console.log("params", params.id);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${params.id}`)
      .then((responseFromApi) => {
        console.log("response", responseFromApi.data.volumeInfo.title);
        const theBook = responseFromApi.data;
        console.log("book", theBook);
        this.setState({ theBook: theBook });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTheBooks = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/private/searchBooks/books`)
      .then((responseFrom) => {
        this.setState({ BooksList: responseFrom.data });
      })
      .catch((err) => console.error(err));
  };

  addToList = (listName) => {
    //const { params } = this.props.match;
    console.log("bookObj", this.state.theBook);
    const bookObj = {
      id: this.state.theBook.id,
      volumeInfo: this.state.theBook.volumeInfo,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URI}/private/books/${this.props.user._id}/push/${listName}`,
        bookObj,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        console.log("response from adding", responseFromApi);
        this.setState({ okMessage: "Book Added" });
        this.getTheBooks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeFromList = (listName) => {
    //const { params } = this.props.match;
    console.log("bookObj", this.state.theBook);
    const bookObj = {
      id: this.state.theBook.id,
      volumeInfo: this.state.theBook.volumeInfo,
    };
    console.log(bookObj);
    const bookobjId = bookObj.id;

    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/private/books/${this.props.user._id}/pull/${listName}/${bookobjId}`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        console.log(responseFromApi, "sdgjdgjsjbbkfs");
        this.setState({ removedMessage: "Removed from List" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    //console.log(this.state.allKindOfBooksList);
    return (
      <div>
        <div className="full-book">
          {this.state.theBook.volumeInfo && (
            <>
              <div className="cover-part">
                <img
                  alt="book cover"
                  src={
                    this.state.theBook.volumeInfo.imageLinks.thumbnail
                      ? this.state.theBook.volumeInfo.imageLinks.thumbnail
                      : null
                  }
                />
                <p className="rating">
                  Rating: {this.state.theBook.volumeInfo.averageRating}/5
                </p>
              </div>
              <div className="info-part">
                <h3>{this.state.theBook.volumeInfo.title.toUpperCase()}</h3>
                <hr />
                <h6>AUTHOR</h6>
                <p>{this.state.theBook.volumeInfo.authors[0]}</p>
                <p>
                  {this.state.theBook.volumeInfo.authors[1]
                    ? this.state.theBook.volumeInfo.authors[1]
                    : null}
                </p>
                <h6>DESCRIPTION</h6>
                {console.log(
                  "description",
                  this.state.theBook.volumeInfo.description
                )}
                <p>
                  {this.state.theBook.volumeInfo.description.replace(
                    /<\/?[^>]+(>|$)/g,
                    " "
                  )}
                </p>
                <h6>YEAR</h6>
                <p>{this.state.theBook.volumeInfo.publishedDate}</p>
                <h6>PUBLISHING HOUSE</h6>
                <p>{this.state.theBook.volumeInfo.publisher}</p>
                {this.state.theBook.volumeInfo.industryIdentifiers ? (
                  <>
                    <h6>ISBN</h6>
                    <p>
                      {this.state.theBook.volumeInfo.industryIdentifiers[1]
                        ? this.state.theBook.volumeInfo.industryIdentifiers[1]
                            .identifier
                        : null}
                    </p>
                    <p>
                      {this.state.theBook.volumeInfo.industryIdentifiers[0]
                        ? this.state.theBook.volumeInfo.industryIdentifiers[0]
                            .identifier
                        : null}
                    </p>
                  </>
                ) : null}
              </div>
            </>
          )}
          {this.props.user ? (
            <div className="list-btns">
              <div className="list-btns-onelist">
                <p className="btn-orient">ADD TO BOOKSHELF</p>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.addToList("paperBooksAPI")}
                >
                  Paper
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.addToList("eBooksAPI")}
                >
                  eBook
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.addToList("audiobooksAPI")}
                >
                  Audiobook
                </button>
                <p className="btn-orient">REMOVE FROM BOOKSHELF</p>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.removeFromList("paperBooksAPI")}
                >
                  Delete Paper
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.removeFromList("eBooksAPI")}
                >
                  Delete eBook
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.removeFromList("audiobooksAPI")}
                >
                  Delete Audiobook
                </button>
              </div>
              <p>{this.state.removedMessage}</p>
              <p>{this.state.okMessage}</p>
              <div className="list-btns-onelist">
                <p className="btn-orient">ADD TO TRACKING</p>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.addToList("pendingBooksAPI")}
                >
                  Pending
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.addToList("progressBooksAPI")}
                >
                  In Progress
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.addToList("readBooksAPI")}
                >
                  Read
                </button>
                <p className="btn-orient">REMOVE FROM TRACKING</p>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.removeFromList("pendingBooksAPI")}
                >
                  Delete Pending
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.removeFromList("progressBooksAPI")}
                >
                  Delete In Progress
                </button>
                <button
                  className="add-to-list-btn"
                  onClick={() => this.removeFromList("readBooksAPI")}
                >
                  Delete Read
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withAuth(BookDetails);
