import { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { bookService } from "@/services/api/books";

export type SearchMode = "local" | "external";

export const useBookSearch = () => {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("local");
  const [localResults, setLocalResults] = useState<Book[]>([]);
  const [googleResults, setGoogleResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const resetSearch = () => {
    setQuery("");
    setLocalResults([]);
    setGoogleResults([]);
    setError(null);
  };

  const searchLocal = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setLocalResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { books: localBooks } = await bookService.searchLocal(searchQuery);
      setLocalResults(localBooks);
      setGoogleResults([]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Local search failed"));
    } finally {
      setLoading(false);
    }
  };

  const searchGoogle = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setGoogleResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const googleBooks = await bookService.searchGoogle(searchQuery);
      setGoogleResults(googleBooks);
      setLocalResults([]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Google search failed"));
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = async (searchQuery: string) => {
    if (searchMode === "local") {
      await searchLocal(searchQuery);
    } else {
      await searchGoogle(searchQuery);
    }
  };

  const getBooks = async () => {
    try {
      const data = await bookService.getBooks();
      setLocalResults(data.books);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch books"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return {
    query,
    setQuery,
    searchMode,
    setSearchMode,
    searchBooks,
    searchLocal,
    searchGoogle,
    localResults,
    googleResults,
    loading,
    error,
    resetSearch,
    getBooks,
  };
};
