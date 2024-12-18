"use client";

import { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { Book } from "@/types/book";
import { BookSearch } from "@/components/features/search/BookSearch";
import { BookSection } from "@/components/features/books/BookSection";
import { Loading } from "@/components/common/Loading/Loading";

export default function Home() {
  const { books, loading, error } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  if (loading) {
    return <Loading className="page__loading" />;
  }

  if (error) {
    return <div className="page__error">Error: {error.message}</div>;
  }

  return (
    <div className="page">
      <main className="page__main">
        <div className="page__content">
          <BookSearch />
        </div>
      </main>
    </div>
  );
}
