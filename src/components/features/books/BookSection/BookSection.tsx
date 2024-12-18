import { BookSectionProps } from "./BookSection.types";
import { BookList } from "@/components/features/books/BookList";

export const BookSection = ({
  title,
  books,
  onBookSelect,
}: BookSectionProps) => {
  console.log(books);

  if (!books.length) return null;

  return (
    <div className="book-section">
      <h2 className="book-section__title">{title}</h2>
      <div className="book-section__content">
        <BookList books={books} onBookSelect={onBookSelect} />
      </div>
    </div>
  );
};
