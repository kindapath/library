import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Book, LocalBook, ExternalBook } from "@/types/book";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

const LocalBookCard = ({
  book,
  onSelect,
}: {
  book: LocalBook;
  onSelect: (book: Book) => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const author = book.authors[0];
  const authorName = author
    ? `${author.lastName} ${author.firstName} ${author.patronymic}`
    : "Автор не указан";

  return (
    <div className="book-card">
      <div className="book-card__image-container">
        {!imageError && book.imageUrl ? (
          <Image
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            fill
            className="book-card__image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="book-card__placeholder">
            <span>Обложка недоступна</span>
          </div>
        )}
      </div>

      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{authorName}</p>
        <p className="book-card__publisher">
          {book.publisher.name}, {book.publisher.city}
        </p>
        <p className="book-card__details">
          {book.pageCount} стр. • {new Date(book.publicationDate).getFullYear()}
        </p>
      </div>

      <div className="book-card__footer">
        <Button disabled={!book.available} onClick={() => onSelect(book)}>
          Скачать
        </Button>
        <span
          className={`book-card__status ${
            book.available
              ? "book-card__status--available"
              : "book-card__status--unavailable"
          }`}
        >
          {book.available ? `В наличии: ${book.amount}` : "Нет в наличии"}
        </span>
      </div>
    </div>
  );
};

const ExternalBookCard = ({ book }: { book: ExternalBook }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="book-card"
      onClick={() => window.open(book.sourceUrl, "_blank")}
    >
      <div className="book-card__image-container">
        {!imageError && book.imageUrl ? (
          <>
            <Image
              src={book.imageUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="book-card__image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div className="book-card__litres-overlay">
              <Image
                src="/images/litres-icon.png"
                alt="LitRes"
                width={48}
                height={27}
              />
            </div>
          </>
        ) : (
          <div className="book-card__placeholder">
            <span>Обложка недоступна</span>
          </div>
        )}
      </div>

      {/* <div className="book-card__content"> */}
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">
        {typeof book.authors === "string" ? book.authors : "Автор не указан"}
      </p>
      <div className="book-card__footer">
        <Button onClick={() => window.open(book.sourceUrl, "_blank")}>
          Открыть
        </Button>
        <div className="book-card__external">
          <span>Внешний ресурс</span>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export const BookCard = ({ book, onSelect }: BookCardProps) => {
  if (book.isExternal) {
    return <ExternalBookCard book={book} />;
  }
  return <LocalBookCard book={book} onSelect={onSelect} />;
};
