import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../lib/AuthProvider";
import service from "../lib/service";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      imageUrl: this.props.user.imageUrl,
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

  handleFormSubmit = (event) => {
    const username = this.state.username;
    const email = this.state.email;
    const imageUrl = this.state.imageUrl;

    event.preventDefault();

    console.log(this.props.user._id);
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/private/profile/${this.props.user._id}/edit`,
        {
          username,
          email,
          imageUrl,
          user: this.props.user
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push(`/profile`);
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
        <div className="form-div-border">
          <form className="form" onSubmit={(e) => this.handleFormSubmit(e)}>
            <label>Name</label>
            <input
              className="form-input"
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />
            <label>Email</label>
            <input
              className="form-input"
              type="text"
              name="email"
              value={this.state.email}
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
        <div className="form-div"></div>
      </div>
    );
  }
}

export default withAuth(EditProfile);
