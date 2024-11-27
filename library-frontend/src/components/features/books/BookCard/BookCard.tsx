import Image from "next/image";
import { BookCardProps } from "./BookCard.types";
import { useState } from "react";

export const BookCard = ({ book, onSelect }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (book.isExternal && book.sourceUrl) {
      window.open(book.sourceUrl, "_blank");
    } else {
      onSelect(book);
    }
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <div className="book-card__image-container">
        {!imageError && book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="book-card__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="book-card__placeholder">
            <span>No cover available</span>
          </div>
        )}
      </div>

      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      <div className="book-card__footer">
        <span className="book-card__isbn">ISBN: {book.isbn}</span>
        <span
          className={`book-card__status ${
            book.available
              ? "book-card__status--available"
              : "book-card__status--unavailable"
          }`}
        >
          {book.available ? "Available" : "Checked Out"}
        </span>
      </div>
    </div>
  );
};
