const queryKeys = {
  // users
  MY_INFO: 'my-info',
  // books
  BOOKS: 'books',
  BOOKS_COUNT: 'books-count',
  BORROWED_TURN_STATS: 'borrowedTurn-stats',
  bookDetail: (bookId: string) => `book-${bookId}`,
  allBooksByAuthor: (authorId: string) => `all books of author-${authorId}`,

  // users
  USERS: 'users',
  NEW_USERS_STATS: 'new-user-stats',
  userDetail: (userId: string) => `user-${userId}`,
  readBooksOfUser:  (userId: string) => `read-books-user-${userId}`,

  // authors
  AUTHORS: 'authors',
  authorDetail: (authorId: string) => `author-${authorId}`,

  // borrow-return
  BORROWED_COUNT: 'borrowed-count',
  BORROW_RECORDS: 'borrow_records',
  BORROW_RETURN_STATS: 'borrow-return-stats',

  // fine
  FINES: 'fines',

  // borrow-return
  NEW_BORRWOW_RECORD_STATS: 'new-borrow-record-stats',
  MONTHLY_BORROW_RECORD_STATS: 'monthly-borrow-record-stats',

  //stats
  RATING_STATS : 'rating-stats',

  //COMMENTS
  COMMENTS: 'comments',

  // messages
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages'
};

export default queryKeys;
