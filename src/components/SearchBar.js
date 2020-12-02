import React, { Component } from "react";

class Search extends Component {
  state = {
    search: "",
    where: "",
  };

  handleSearch = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.filterBooks(this.state.where, this.state.search);
    this.setState({
      search: "",
      where: "",
    });
  };

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <form className="search-div" onSubmit={this.handleSearch}>
        <label>
          Title
          <input
            className="check"
            type="radio"
            name="where"
            value="intitle"
            onChange={this.handleChange}
          />
        </label>
        <label>
          Author
          <input
            className="check"
            type="radio"
            name="where"
            value="inauthor"
            onChange={this.handleChange}
          />
        </label>
        {/*             <label>Genre
            <input type="radio" name="where" value="genre" onChange={this.handleChange} />
            </label> */}
        <input
          className="search"
          type="text"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="Search"
        />
      </form>
    );
  }
}

export default Search;
