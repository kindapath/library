import { NextResponse } from "next/server";
import { mockBooks } from "@/data/mockBooks";
import { Author } from "@/types/book";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = mockBooks.filter((book) => {
    const authorMatch = Array.isArray(book.authors)
      ? book.authors.some((author: Author) =>
          `${author.firstName} ${author.lastName} ${author.patronymic}`
            .toLowerCase()
            .includes(query)
        )
      : book.authors.toLowerCase().includes(query);

    return (
      book.title.toLowerCase().includes(query) ||
      authorMatch ||
      book.isbn?.includes(query)
    );
  });

  return NextResponse.json(results);
}
