import { LocalBook } from "./book";

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

export interface GetBooksResponse {
  books: LocalBook[];
  pagination: {
    pageNumber: number;
    totalItems: number;
  };
}

export interface GetBooksRequest {
  title?: string;
  isbn?: string;
  bookType?: string;
  imageUrl?: string;
}

export interface PageableRequest {
  page: number;
  size: number;
  sort: string[];
}
