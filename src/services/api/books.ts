import { Book } from "@/types/book";
import { mockBooks } from "@/data/mockBooks";

export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockBooks;
  },
};

export default bookService;
