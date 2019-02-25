import React from "react";

const Book = props => {
  // handle book data of any type
  const handleData = data => {
    return data ? (Array.isArray(data) ? handleArrays(data) : data) : null;
  };
  // handle book data of the array type
  const handleArrays = data => {
    return !data ? "" : data.length > 0 ? data.join(", ") : "";
  };
  // unpack props
  const { id, title, authors, publisher, image, previewLink } = props;
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

          <a className="btn book-link-btn" href={previewLink} target="blank">
            See this book
          </a>
        </div>
      </div>
    </li>
  );
};

export default Book;
