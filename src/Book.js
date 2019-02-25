import React, { Component } from "react";
import "./App.css";

class Book extends Component {
  render() {
    const {
      id,
      title,
      authors,
      publisher,
      image,
      selfLink,
      handleData
    } = this.props;
    return (
      <li className="book__box" key={id}>
        <div className="book__header">
          <h2 className="heading--secondary">{title}</h2>{" "}
        </div>
        <div className="book__body">
          <div className="book__image-container">
            {image !== "" ? (
              <img className="book-thumbnail book-thumbnail--img" src={image} />
            ) : (
              <div className="book-thumbnail book-thumbnail--missing">
                <span className="">Image not found</span>
              </div>
            )}
          </div>
          <div class="book__details-container">
            {authors !== "" ? (
              <p className="book__body--detail">By: {handleData(authors)}</p>
            ) : (
              <p className="book__body--detail">Author not found</p>
            )}
            {publisher !== "" ? (
              <p className="book__body--detail">
                Publisher: {handleData(publisher)}
              </p>
            ) : (
              <p className="book__body--detail">Publisher not found</p>
            )}

            <a className="btn book-link-btn" href={selfLink} target="blank">
              See this book
            </a>
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
