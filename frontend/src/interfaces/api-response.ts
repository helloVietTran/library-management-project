export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      statusCode?: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}