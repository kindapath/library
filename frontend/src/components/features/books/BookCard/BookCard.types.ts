import { Book } from "@/types/book";

export interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  isLitres?: boolean;
}
