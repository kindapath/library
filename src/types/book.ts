export interface Author {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
}

export interface Publisher {
  name: string;
  city: string;
  country: string;
}

export interface BaseBook {
  bookId: number | string;
  isbn: string | null;
  title: string;
  imageUrl?: string;
  available: boolean;
}

export interface LocalBook extends BaseBook {
  bookType: "DIGITAL";
  publicationDate: string;
  pageCount: number;
  authors: Author[];
  publisher: Publisher;
  amount: number;
  isExternal?: false;
}

export interface ExternalBook extends BaseBook {
  isExternal: true;
  sourceUrl: string;
  authors: string | Author[];
  publishedYear?: number;
}

export type Book = LocalBook | ExternalBook;
