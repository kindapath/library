"use client";

import { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { Book } from "@/types/book";
import { BookSearch } from "@/components/features/search/BookSearch";
import { BookSection } from "@/components/features/books/BookSection";

export default function Home() {
  const { books, loading, error } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  if (loading) {
    return <div className="page__loading">Loading...</div>;
  }

  if (error) {
    return <div className="page__error">Error: {error.message}</div>;
  }

  return (
    <div className="page">
      <header className="page__header">
        <div className="page__header-content">
          <h1 className="page__title">Library Catalog</h1>
        </div>
      </header>

      <main className="page__main">
        <div className="page__content">
          <BookSearch />
          <BookSection
            title="Книги в наличии"
            books={books}
            onBookSelect={handleBookSelect}
          />
        </div>
      </main>
    </div>
  );
}
