import { Book } from "@/types/book";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishedYear: 1925,
    available: true,
    coverImage:
      "https://www.hachettebookgroup.com/wp-content/uploads/2020/06/9780762498130-3.jpg?w=488",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishedYear: 1949,
    available: false,
    coverImage: "https://m.media-amazon.com/images/I/61ZewDE3beL.jpg",
  },
  // Add more mock books as needed
];
