import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Book, LocalBook, ExternalBook } from "@/types/book";
import bookService from "@/services/api/books";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

const LocalBookCard = ({
  book,
}: {
  book: LocalBook;
  onSelect: (book: Book) => void;
}) => {
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const blob = await bookService.downloadBook(book.bookId.toString());

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${book.title}.pdf`; // Set filename
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.log("error", error);
      setDownloadError("Ошибка при скачивании книги");

      setTimeout(() => {
        setDownloadError(null);
      }, 3000);
    } finally {
      setIsDownloading(false);
    }
  };

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
        <Button
          disabled={!book.available || isDownloading}
          onClick={handleDownload}
          isLoading={isDownloading}
        >
          {isDownloading ? "Загрузка..." : "Скачать"}
        </Button>
        <span
          className={`book-card__status ${
            book.available
              ? "book-card__status--available"
              : "book-card__status--unavailable"
          }`}
        >
          {book.available ? `В наличии` : "Нет в наличии"}
        </span>
      </div>

      {downloadError && <div className="book-card__error">{downloadError}</div>}
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
