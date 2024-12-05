export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  available: boolean;
  coverImage?: string;
  isExternal?: boolean;
  sourceUrl?: string;
  description?: string;
}
