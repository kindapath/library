import { BookListProps } from "./BookList.types";
import { BookCard } from "@/components/features/books/BookCard";

export const BookList = ({ books, onBookSelect }: BookListProps) => {
  if (!books.length) {
    return (
      <div className="book-list__empty">
        <p>В данный момент нет доступных книг</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.bookId}
          book={book}
          onSelect={onBookSelect}
          isExternal={book.isExternal}
        />
      ))}
    </div>
  );
};
