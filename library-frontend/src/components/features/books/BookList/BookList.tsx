import { BookListProps } from "./BookList.types";
import { BookCard } from "@/components/features/books/BookCard";

export const BookList = ({ books, onBookSelect }: BookListProps) => {
  if (!books.length) {
    return (
      <div className="book-list__empty">
        <p>No books available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onSelect={onBookSelect} />
      ))}
    </div>
  );
};
