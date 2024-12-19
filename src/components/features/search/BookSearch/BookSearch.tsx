import { KeyboardEvent, useEffect, useState } from "react";
import { useBookSearch } from "@/hooks/useBookSearch";
import { BookSection } from "@/components/features/books/BookSection";
import { Button } from "@/components/common/Button";

export const BookSearch = () => {
  const {
    query,
    setQuery,
    searchMode,
    setSearchMode,
    searchBooks,
    searchGoogle,
    localResults,
    googleResults,
    loading,
    error,
    resetSearch,
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

  const handleSwitchToExternal = async () => {
    await setSearchMode("external");
    searchGoogle(query);
  };

  const handleReset = () => {
    resetSearch();
    setHasSearched(false);
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

      <div className="book-search__controls">
        <div className="book-search__tabs">
          <button
            className={`book-search__tab ${
              searchMode === "local" ? "book-search__tab--active" : ""
            }`}
            onClick={() => setSearchMode("local")}
          >
            Библиотека
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
        {hasSearched && (
          <Button
            onClick={handleReset}
            // variant="secondary"
            className="button button__secondary book-search__reset-button"
          >
            Сбросить поиск
          </Button>
        )}
      </div>

      {error && (
        <div className="book-search__error">Ошибка поиска: {error.message}</div>
      )}

      {!hasSearched && !loading && searchMode === "external" && (
        <div className="book-search__placeholder">
          Введите ваш запрос, чтобы начать поиск{" "}
          <strong>на внешних ресурсах</strong>
        </div>
      )}

      {searchMode === "local" && hasSearched && localResults.length === 0 && (
        <div className="book-search__no-results">
          <p>В библиотеке ничего не найдено</p>
          <Button
            onClick={handleSwitchToExternal}
            variant="secondary"
            className="button button__secondary book-search__change-mode-button"
          >
            Искать во внешних ресурсах
          </Button>
        </div>
      )}

      {searchMode === "external" &&
        hasSearched &&
        googleResults.length === 0 && (
          <div className="book-search__no-results">
            <p>Во внешних ресурсах ничего не найдено</p>
          </div>
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
