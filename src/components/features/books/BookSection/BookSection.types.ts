import { Book } from "@/types/book";

export interface BookSectionProps {
  title: string;
  books: Book[];
  onBookSelect: (book: Book) => void;
}
