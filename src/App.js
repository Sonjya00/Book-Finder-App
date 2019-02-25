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
  // handle book data of any type
  handleData = data => {
    return data ? (Array.isArray(data) ? this.handleArrays(data) : data) : null;
  };
  // handle book data of the array type
  handleArrays(data) {
    return !data ? "" : data.length > 0 ? data.join(", ") : "";
  }
  render() {
    const { books, errorMsg } = this.state;
    return (
      <div className="App">
        <h1 className="heading--primary">Book Finder</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="Search by book, title, or author"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className="btn search-btn" onClick={this.checkInput}>
          Search
        </button>
        {this.state.isLoading && <p className="loading-msg">Loading...</p>}
        {this.state.errorMsg && <p className="error-msg">{errorMsg}</p>}
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
                  selfLink={volumeInfo.previewLink}
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
