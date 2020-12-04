import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";

class AddClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      currentBookTitle: "",
      meetingDate: "",
      meetingHour: "",
      meetingLink: "",
      creator: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const currentBookTitle = this.state.currentBookTitle;
    const meetingDate = this.state.meetingDate;
    const meetingHour = this.state.meetingHour;
    const meetingLink = this.state.meetingLink;

    axios
      .post(
        `${process.env.REACT_APP_API_URI}/private/book-clubs/${this.props.user._id}/add`,
        {
          title,
          description,
          currentBookTitle,
          meetingDate,
          meetingHour,
          meetingLink,
        },
        { withCredentials: true }
      )
      .then(() => {
        // this.props.getData();
        this.setState({
          title: "",
          description: "",
          currentBookTitle: "",
          meetingDate: "",
          meetingHour: "",
          meetingLink: "",
        });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div className="form-div-border club-edit-form">
          <form className="form" onSubmit={this.handleFormSubmit}>
            <label>Club Name</label>
            <input
              className="form-input"
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Description</label>
            <textarea
              className="form-textarea"
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Current Book Title</label>
            <input
              className="form-input"
              type="text"
              name="currentBookTitle"
              value={this.state.currentBookTitle}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Meeting Date</label>
            <input
              className="form-input"
              type="text"
              name="meetingDate"
              value={this.state.meetingDate}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Meeting Hour</label>
            <input
              className="form-input"
              type="text"
              name="meetingHour"
              value={this.state.meetingHour}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Meeting Link</label>
            <input
              className="form-input"
              type="text"
              name="meetingLink"
              value={this.state.meetingLink}
              onChange={(e) => this.handleChange(e)}
            />

            <input className="form-btn" type="submit" value="Submit" />
          </form>
        </div>
        <div className="form-div club-edit-form"></div>
      </div>
    );
  }
}

export default withAuth(AddClub);
