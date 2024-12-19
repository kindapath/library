"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export default function MyBooks() {
  return (
    <div className="my-books">
      <div className="my-books__no-books">
        <FontAwesomeIcon icon={faBook} size="4x" />
        <p className="my-books__no-books-text">
          Здесь будут отображаться ваши книги.
        </p>
      </div>
    </div>
  );
}
