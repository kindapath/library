import Image from "next/image";
import { BookCardProps } from "./BookCard.types";
import { useState } from "react";
import { Button } from "@/components/common/Button";

export const BookCard = ({ book, onSelect, isLitres }: BookCardProps) => {
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
          <>
            <Image
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              fill
              className="book-card__image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            {isLitres && (
              <div className="book-card__litres-overlay">
                <Image
                  src="/images/litres-icon.png"
                  alt="LitRes"
                  width={48}
                  height={27}
                />
              </div>
            )}
          </>
        ) : (
          <div className="book-card__placeholder">
            <span>No cover available</span>
          </div>
        )}
      </div>

      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
      </div>

      <div className="book-card__footer">
        {book.isExternal ? (
          <span className="book-card__external">Внешний ресурс</span>
        ) : (
          <>
            <Button disabled={!book.available} onClick={() => onSelect(book)}>
              Взять
            </Button>
            <span
              className={`book-card__status ${
                book.available
                  ? "book-card__status--available"
                  : "book-card__status--unavailable"
              }`}
            >
              {book.available ? "В наличии" : "Нет в наличии"}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
