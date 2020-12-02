import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <img
        className="home-cover"
        src="https://res.cloudinary.com/martajank/image/upload/v1598566162/Sin_t%C3%ADtulo_eqzfzu.png"
      />
      <div className="horitzontal-scroll">
        <ul className="hs">
          <li className="item">
            <img
              className="cards-img"
              alt="flying books and boy in the forest"
              src="../images/2375391.jpg"
            />
            <h5 className="card-title">FIND AMAZING BOOKS</h5>
            <hr className="card-hr" />
            <p className="card-text">
              You can search for as many books as you want and push them into
              different list!
            </p>
            <Link to={"/books"}>
              <button className="card-btn">Book finder</button>
            </Link>
          </li>
          <li className="item">
            <img
              className="cards-img"
              alt="opened book with bookshelf background"
              src="../images/5920.jpg"
            />
            <h5 className="card-title">BUILD YOUR BOOKSHELF</h5>
            <hr className="card-hr" />
            <p className="card-text">
              The different lists allow you to push books into them to sort your
              bookshelf!
            </p>
            <Link to={"/bookshelf"}>
              <button className="card-btn">Build a Bookshelf</button>
            </Link>
          </li>
          <li className="item">
            <img
              className="cards-img"
              alt="coffee and book and lavender"
              src="../images/coffee-2151200.jpg"
            />
            <h5 className="card-title">YOUR READING HABITS</h5>
            <hr className="card-hr" />
            <p className="card-text">
              You can also push books into tracking lists to know which books
              are pending, which are you reading and which you've read.
            </p>
            <Link to={"/tracking"}>
              <button className="card-btn">Track your reads</button>
            </Link>
          </li>
          <li className="item">
            <img
              className="cards-img"
              alt="girl with socks and a coffee reading"
              src="../images/books-3454381.jpg"
            />
            <h5 className="card-title">JOIN A BOOK CLUB</h5>
            <hr className="card-hr" />
            <p className="card-text">
              You can also create and join different book clubs to share your
              reading experience with others!
            </p>
            <Link to={"/book-clubs"}>
              <button className="card-btn">Join</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="home-bookshelf">
        <div className="home-bk-left">
          <img
            className="description-img"
            alt="book and coffee and raffaello"
            src="../images/coffee-2784289 copy.jpg"
          />
        </div>
        <div className="home-bk-right">
          <h4 className="home-right-title">SORT YOUR BOOKSHELF</h4>
          <hr className="home-right-hr" />
          <p className="home-right-p">
            Once you create your bookshelf you'll be able to sort your books by
            the ones you own in paper, ebook or audiobook.
          </p>
          <p className="home-right-p">
            You can also sort them by the ones you've read, the ones you have in
            progress and the pending ones you'd love to read!
          </p>
        </div>
      </div>
      <div className="home-club-all">
        <hr className="main-hr" />
        <div className="home-club">
          <div className="home-club-left">
            <h4 className="home-right-title">CREATE A BOOK CLUB</h4>
            <hr className="home-club-hr" />
            <p className="home-right-p">
              You can either join or create a book club!
            </p>
            <p className="home-right-p">
              If you're not into any of the book clubs that you find you can
              always create and manage your own!
            </p>
            <p className="home-right-p">It's easier than you think!</p>
            <Link to={"/book-clubs"}>
              <button className="card-btn">TRY IT HERE</button>
            </Link>
          </div>
          <div className="home-club-right">
            <img
              className="description-img-club"
              alt="person in socks on a blankett reading"
              src="../images/book-1031359.jpg"
            />
          </div>
        </div>
        <hr className="main-hr" />
      </div>
    </div>
  );
}

export default Home;
