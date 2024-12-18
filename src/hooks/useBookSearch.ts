import { useState } from "react";
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

  const searchBooks = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setLocalResults([]);
      setGoogleResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (searchMode === "local") {
        const { books: localBooks } = await bookService.searchLocal(
          searchQuery
        );
        setLocalResults(localBooks);
        setGoogleResults([]);
      } else {
        const googleBooks = await bookService.searchGoogle(searchQuery);
        setGoogleResults(googleBooks);
        setLocalResults([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Search failed"));
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    searchMode,
    setSearchMode,
    searchBooks,
    localResults,
    googleResults,
    loading,
    error,
  };
};
