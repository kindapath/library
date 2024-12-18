import { KeyboardEvent, useState } from "react";
import { useBookSearch, SearchMode } from "@/hooks/useBookSearch";
import { BookSection } from "@/components/features/books/BookSection";
import { Button } from "@/components/common/Button";

export const BookSearch = () => {
  const {
    query,
    setQuery,
    searchMode,
    setSearchMode,
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

  const handleSearch = () => {
    setHasSearched(true);
    searchBooks(query);
  };

  return (
    <div className="book-search">
      <div className="book-search__input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Поиск книг..."
          className="book-search__input"
        />
        <Button onClick={handleSearch} disabled={loading} isLoading={loading}>
          Найти
        </Button>
      </div>

      <div className="book-search__tabs">
        <button
          className={`book-search__tab ${
            searchMode === "local" ? "book-search__tab--active" : ""
          }`}
          onClick={() => setSearchMode("local")}
        >
          В библиотеке
        </button>
        <button
          className={`book-search__tab ${
            searchMode === "external" ? "book-search__tab--active" : ""
          }`}
          onClick={() => setSearchMode("external")}
        >
          Внешние ресурсы
        </button>
      </div>

      {error && (
        <div className="book-search__error">Ошибка поиска: {error.message}</div>
      )}

      {searchMode === "external" && !hasSearched && (
        <div className="book-search__placeholder">
          Введите ваш запрос, чтобы начать поиск на внешних ресурсах
        </div>
      )}

      {hasSearched && !localResults.length && !googleResults.length && (
        <div className="book-search__no-results">Книги не найдены</div>
      )}

      {searchMode === "local" ? (
        <BookSection
          title="Результаты поиска в библиотеке"
          books={localResults}
          onBookSelect={() => {}}
        />
      ) : (
        hasSearched && (
          <BookSection
            title="Результаты поиска в интернете"
            books={googleResults}
            onBookSelect={() => {}}
          />
        )
      )}
    </div>
  );
};
