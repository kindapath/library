import { Book } from "@/types/book";

export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    // Simulate API call with mock data for now
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch("/api/books");
    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
  },

  addBook: async (book: Omit<Book, "id">): Promise<Book> => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Failed to add book");
    return response.json();
  },
};

export default bookService;
