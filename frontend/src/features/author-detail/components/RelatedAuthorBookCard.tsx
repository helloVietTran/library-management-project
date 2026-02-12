import { Avatar, Divider } from 'antd';
import Link from 'next/link';
import React from 'react';

interface RelatedAuthorBookCardProps {
  title: string;
  authors: string[];
  rating: number;
  ratingsCount: number;
  publishedYear: number;
  bookImage: string;
  bookId: string;
}

const RelatedAuthorBookCard: React.FC<RelatedAuthorBookCardProps> = ({
  title,
  authors,
  rating,
  ratingsCount,
  publishedYear,
  bookImage,
  bookId
}) => {
  return (
    <div className="author-book-card">
      <Divider className="custom-divider" />
      <div className="flex">
        <Link href={`/books/${bookId}`}>
          <Avatar
            src={bookImage}
            alt="Book Thumbnail"
            shape="circle"
            size={80}
            className="object-cover"
          />
        </Link>
        <div className="ml-4 flex-1">
          <Link href={`/books/${bookId}`} className="book-link">
            <h2 className="text-base text-primary font-semibold">{title}</h2>
          </Link>
          <p className="text-sm text-gray-600">by {authors.join(', ')}</p>

          <div className="flex items-center mt-2">
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {rating.toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {ratingsCount.toLocaleString()} lượt đánh giá — xuất bản năm {publishedYear}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RelatedAuthorBookCard;
