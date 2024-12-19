"use client";

import { useEffect, useState } from "react";

import { BookSearch } from "@/components/features/search/BookSearch";
import { Loading } from "@/components/common/Loading/Loading";
import { useBookSearch } from "@/hooks/useBookSearch";

export default function Home() {
  const { loading, error, getBooks } = useBookSearch();

  useEffect(() => {
    getBooks();
  }, []);

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
