import { BookSectionProps } from "./BookSection.types";
import { BookList } from "@/components/features/books/BookList";

export const BookSection = ({
  title,
  books,
  onBookSelect,
}: BookSectionProps) => {
  if (!books.length) return null;

  return (
    <div className="book-search__section">
      <h2 className="book-search__section-title">{title}</h2>
      <BookList books={books} onBookSelect={onBookSelect} />
    </div>
  );
};
