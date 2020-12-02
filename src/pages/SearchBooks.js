import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

import SearchBar from '../components/SearchBar';

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filteredBooks: []
        };
    }
    
    dynamicSearchTitle = (where, query) => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?langRestrict=en&orderBy=relevance&printType=BOOKS&q=${where}:${query}`)
        .then((responseFromApi) => {
          const searchResult = responseFromApi.data.items;
          this.setState({ filteredBooks: searchResult });
        })
        .catch((err) => console.log(err));
    }

    render() {
        return(
            <div className="search-div">
                <SearchBar filterBooks={this.dynamicSearchTitle} />
                <div className="shown-books">
                    {this.state.filteredBooks ? this.state.filteredBooks.map(book => {
                        return(
                                <div className="book-show">
                                   {book && book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? <Link to={`/books/${book.id}`}><img alt="book thumbnail" src={book.volumeInfo.imageLinks.thumbnail} /></Link> : null}
                                    <p>{book.volumeInfo.title}</p>
                                </div>
                        )
                    }) : null}
                </div>
            </div>
        )
    }
}

export default SearchBooks