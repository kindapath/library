import { KeyboardEvent, useState } from "react";

import { useBookSearch } from "@/hooks/useBookSearch";
import { BookSection } from "@/components/features/books/BookSection";
import { Button } from "@/components/common/Button";

export const BookSearch = () => {
  const {
    query,
    setQuery,
    searchBooks,
    localResults,
    googleResults,
    loading,
    error,
  } = useBookSearch();

  const [hasSearched, setHasSearched] = useState(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHasSearched(true);
      searchBooks(query);
    }
  };

  return (
    <div className="book-search">
      <div className="book-search__input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Поиск книг..."
          className="book-search__input"
        />
        <Button
          onClick={() => searchBooks(query)}
          disabled={loading}
          isLoading={loading}
        >
          Найти
        </Button>
      </div>

      {error && (
        <div className="book-search__error">Ошибка поиска: {error.message}</div>
      )}

      {hasSearched && !localResults.length && !googleResults.length && (
        <div className="book-search__no-results">Книги не найдены</div>
      )}

      <BookSection
        title="Результаты поиска в библиотеке"
        books={localResults}
        onBookSelect={() => {}}
      />

      <BookSection
        title="Результаты поиска в интернете"
        books={googleResults}
        onBookSelect={() => {}}
      />
    </div>
  );
};
