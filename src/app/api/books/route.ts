import { NextResponse } from "next/server";
import { mockBooks } from "@/data/mockBooks";

export async function GET() {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockBooks);
}
