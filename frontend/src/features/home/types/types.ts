export interface TimeBasedStatsResponse {
  currentMonth: number;
  previousMonth: number;
}
export interface MonthlyBorrowReturnCount {
  borrowedBooksCount: number;
  returnedBooksCount: number;
}

export interface BorrowReturnStatsResponse {
  [month: string]: MonthlyBorrowReturnCount;
}
export interface MonthlyBorrowCountResponse {
  [month: string]: number;
}
