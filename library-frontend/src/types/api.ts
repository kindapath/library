export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface SearchResponse {
  localResults: Book[];
  googleResults: Book[];
}
