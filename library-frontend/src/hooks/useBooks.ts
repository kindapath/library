import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { bookService } from "@/services/api/books";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getBooks();
        setBooks(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch books")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};
