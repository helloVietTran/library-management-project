export interface CreateBorrowRecordData {
  userId: string;
  bookId: string;
  dueDate: Date;
}

export interface ReturnBookData {
  status: 'ok' | 'break' | 'lost';
  note?: string;
}

export interface SendOverdueMailData {
  receiver: string;
  recordId: string;
}
