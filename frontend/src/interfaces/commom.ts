interface Id {
  _id: string;
}

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface LastMessage {
  text: string;
  sender: string;
  seen: boolean;
}

export interface Conversation extends Id {
  participants: User[];
  lastMessage: LastMessage;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message extends Id {
  text?: string;
  img?: string;
  sender: string;
  seen?: boolean;
}

export interface Author extends Id {
  name: string;
  biography?: string;
  dob?: Date;
  awards?: string[];
  imgSrc?: string;
  nationality?: string;
}

export interface Role extends Id {
  name: 'admin' | 'librarian' | 'user';
  description?: string;
}

export interface User extends Id {
  avatar?: string;
  password: string;
  email: string;
  role: Role;
  fullName: string;
  dob: Date;
  phoneNumber?: string;
  address: Address;
  registeredDate: Date;
  status: 'active' | 'locked' | 'banned';
  bio?: string;
  readBooksCount: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  elementsPerPage?: number;
  totalElement?: number;
}

export interface Book extends Id {
  title: string;
  description?: string;
  publishedDate: Date;
  authors: Author[];
  genres?: string[];
  ISBN: string;
  coverImage?: string;
  language?: string;
  publisher?: string;
  quantity: number;
  price: number;
  rating?: number;
  ratingsCount?: number;
  ratingPoint?: number;
  pageCount: number;
}


export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer'
}

export interface Fine extends Id {
  amount: number;
  issuedDate: Date;
  paid: boolean;
  paidDate?: Date;
  reason: string;
  paymentMethod?: PaymentMethod;
  collectedBy?: User;
  user: User;
}

export interface BorrowRecord extends Id {
  user: User;
  book: Book;
  dueDate: Date;
  returnDate?: Date;
  fine?: Fine;
  status: 'ok' | 'lost' | 'break';
  note?: string;
  createdAt: Date;
}

export interface Comment extends Id {
  book: Book;
  user: User;
  content: string;
  rating: number;
  createdAt: Date;
  updatedAt?: Date;
  likes?: User[];
}
