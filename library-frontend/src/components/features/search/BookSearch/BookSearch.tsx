import { KeyboardEvent } from "react";
import { useBookSearch } from "@/hooks/useBookSearch";
import { BookSection } from "@/components/features/books/BookSection";

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

  const handleSearch = () => {
    searchBooks(query);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
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
        <button
          onClick={handleSearch}
          className="book-search__button"
          disabled={loading}
        >
          {loading ? "Поиск..." : "Найти"}
        </button>
      </div>

      {error && (
        <div className="book-search__error">Ошибка поиска: {error.message}</div>
      )}

      {query && !loading && !localResults.length && !googleResults.length && (
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
