export interface CountResponse {
  quantity: number;
}

export interface BorrowedCountStatsResponse {
  label: '< 10' | '10 - 100' | '> 100';
  count: number;
  _id: any;
}

export interface CreateBookRequest {
  title: string;
  description?: string;
  publishedDate?: Date | string;
  quantity: number;
  price: number;
  pageCount: number;
  authors: string[];
  genres: string[];
  language?: string;
  publisher?: string;
  file: File;
}

export interface UpdateBookRequest {
  title?: string;
  description?: string;
  genres?: string[];
  quantity?: number;
  price?: number;
  publishedDate?: Date | string;
  file: File;
}

