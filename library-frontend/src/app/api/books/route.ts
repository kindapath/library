import { NextResponse } from "next/server";
import { mockBooks } from "@/data/mockBooks";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockBooks);
}

export async function POST(request: Request) {
  const book = await request.json();
  // Here you would typically save to a database
  // For now, we'll just return the book with a fake ID

  return NextResponse.json({
    ...book,
    id: Math.random().toString(36).substr(2, 9),
  });
}
