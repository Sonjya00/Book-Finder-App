import React, { Component } from "react";
import "./App.css";
import Book from "./Book";

class App extends Component {
  state = {
    query: "",
    books: [],
    isLoading: false,
    errorMsg: ""
  };
  checkInput = () => {
    this.state.query
      ? this.searchBooks()
      : this.setState({
          errorMsg: "Error: please provide a search query first"
        });
  };
  handleKeyDown = e => {
    console.log(e);
    if (e.keyCode === 13) {
      this.checkInput();
    }
  };
  searchBooks = () => {
    let query = this.state.query;
    const BASE_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    this.setState({
      isLoading: true,
      errorMsg: ""
    });
    fetch(BASE_URL, { method: "GET" })
      .then(response => response.json())
      .then(json => {
        let { items } = json;
        console.log(items);
        this.setState({
          books: items,
          isLoading: false
        });
      });
  };
  handleChange = event => {
    this.setState({
      query: event.target.value
    });
  };
  render() {
    const { books, errorMsg } = this.state;
    return (
      <div className="App">
        {/* Upper area */}
        <h1 className="heading--primary">
          Book Finder <i class="fas fa-book" />
        </h1>
        <div className="action__container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by book, title, or author..."
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <button className="btn search-btn" onClick={this.checkInput}>
            Search
          </button>
          {this.state.isLoading && <p className="loading-msg">Loading...</p>}
          {this.state.errorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>
        {/* Search result area */}
        {books.length === 0 ? (
          <p className="initial-msg">
            <i class="far fa-frown" /> Nothing Here Yet - Try Searching For a
            Book
          </p>
        ) : (
          <ul className="books__container">
            {books.map(book => {
              const { id, volumeInfo } = book;
              return (
                <Book
                  handleData={this.handleData}
                  key={id}
                  title={volumeInfo.title}
                  authors={volumeInfo.authors ? volumeInfo.authors : ""}
                  publisher={volumeInfo.publisher ? volumeInfo.publisher : ""}
                  image={
                    volumeInfo.imageLinks
                      ? volumeInfo.imageLinks.smallThumbnail
                      : ""
                  }
                  previewLink={volumeInfo.previewLink}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
