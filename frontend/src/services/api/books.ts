import { Book } from "@/types/book";

export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    // Simulate API call with mock data for now
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch("/api/books");
    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
  },
};

export default bookService;
