import React from "react";

const faq = () => {
  return (
    <div className="faq-section">
      <article>
        <h3 className="question right">What is this site meant for?</h3>
        <div className="form-div-border faq">
          <p>
            ReadShelf is a platform you can use when you want to keep track of
            the books you're reading or keep the books you own organized online.
          </p>
        </div>
        <div className="form-div faq-bg"></div>
      </article>
      <article>
        <h3 className="question left">
          What if the book I search for doesn't appear?
        </h3>
        <div className="form-div-border faq">
          <p>
            We're working on a feature in which you can create your own book
            files and add the books you create to your lists.
          </p>
        </div>
        <div className="form-div faq-bg"></div>
      </article>
      <article>
        <h3 className="question right">How can I join a Book Club meeting?</h3>
        <div className="form-div-border faq">
          <p>
            You can just click on the date or hour of the Book Club, it should
            redirect you to the meeting the owner of the club created for it.
          </p>
        </div>
        <div className="form-div faq-bg"></div>
      </article>
      <article>
        <h3 className="question left">How many books can I add to my lists?</h3>
        <div className="form-div-border faq">
          <p>
            As many as you wish, there's no limit for that. We're working on a
            more dynamic view of the books for those users that have added more
            than 50 books to a list.
          </p>
        </div>
        <div className="form-div faq-bg"></div>
      </article>
    </div>
  );
};

export default faq;
