import { NextResponse } from "next/server";
import { mockBooks } from "@/data/mockBooks";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = mockBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.isbn.includes(query)
  );

  return NextResponse.json(results);
}
