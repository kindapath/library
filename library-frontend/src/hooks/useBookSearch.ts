import { useState } from "react";
import { Book } from "@/types/book";
import { searchService } from "@/services/api/search";

export const useBookSearch = () => {
  const [query, setQuery] = useState("");
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
      const localBooks = await searchService.searchLocal(searchQuery);
      setLocalResults(localBooks);

      if (localBooks.length === 0) {
        const googleBooks = await searchService.searchGoogle(searchQuery);
        setGoogleResults(googleBooks);
      } else {
        setGoogleResults([]);
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
    searchBooks,
    localResults,
    googleResults,
    loading,
    error,
  };
};
