import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../lib/service";

class ClubEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      currentBookTitle: "",
      meetingDate: "",
      meetingHour: "",
      meetingLink: "",
      imageUrl: "",
    };
  }

  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };

  componentDidMount() {
    this.getCreatedClub();
  }

  getCreatedClub = () => {
    const { params } = this.props.match;
    console.log("params", params.id);
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/private/book-clubs/created/one/${params.id}`,
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        const theClub = responseFromApi.data;
        console.log("club", theClub);
        this.setState({
          title: theClub.title,
          description: theClub.description,
          currentBookTitle: theClub.currentBookTitle,
          meetingDate: theClub.meetingDate,
          meetingHour: theClub.meetingHour,
          meetingLink: theClub.meetingLink,
          imageUrl: theClub.imageUrl,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFormSubmit = (event) => {
    const title = this.state.title;
    const description = this.state.description;
    const currentBookTitle = this.state.currentBookTitle;
    const meetingDate = this.state.meetingDate;
    const meetingHour = this.state.meetingHour;
    const meetingLink = this.state.meetingLink;
    const imageUrl = this.state.imageUrl;

    console.log("title", this.state.title);
    event.preventDefault();

    const { params } = this.props.match;
    axios
      .patch(
        `${process.env.REACT_APP_API_URI}/private/book-clubs/${this.props.user._id}/edit/${params.id}`,
        {
          title,
          description,
          currentBookTitle,
          meetingDate,
          meetingHour,
          meetingLink,
          imageUrl,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push(`/book-clubs/${this.props.user._id}/created`);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <div className="form-div-border club-edit-form">
          <form className="form" onSubmit={this.handleFormSubmit}>
            <label>Title</label>
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
            <input
              className="form-input"
              type="file"
              onChange={(e) => this.handleFileUpload(e)}
            />

            <input className="form-btn" type="submit" value="Submit" />
          </form>
        </div>
        <div className="form-div club-edit-form"></div>
      </div>
    );
  }
}

export default withAuth(ClubEdit);
