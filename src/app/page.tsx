"use client";

import { useEffect } from "react";

import { BookSearch } from "@/components/features/search/BookSearch";
import { Loading } from "@/components/common/Loading/Loading";
import { useBookSearch } from "@/hooks/useBookSearch";

export default function Home() {
  const { loading, getBooks } = useBookSearch();

  useEffect(() => {
    getBooks();
  }, []);

  if (loading) {
    return <Loading className="page__loading" />;
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
