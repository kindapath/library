import { Book } from "@/types/book";

export interface BookListProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}
