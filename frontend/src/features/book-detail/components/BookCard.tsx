import React from 'react';
import Link from 'next/link';

interface BookCardProps {
  data: Pick<
    any,
    'id' | 'imgSrc' | 'title' | 'authorNames' | 'ratingPoint' | 'reviewCount'
  >;
}

const BookCard: React.FC<BookCardProps> = ({ data }) => {
  return (
    <div className="book-card">
      <Link href={`/books/${data.id}`}>
        <img
          src={data.imgSrc}
          alt={data.title}
          className="inline-block w-full h-[240px] rounded-lg object-cover"
        />
      </Link>
      <Link href={`/books/${data.id}`}>
        <h3 className="font-semibold text-gray-700 mt-[10px] mb-[4px] hover:underline">
          {data.title}
        </h3>
      </Link>
      <p className="text-gray-500 text-sm">
        {[...data.authorNames].map((author, index, array) => {
          return (
            <span key={author}>
              {author}
              {index < array.length - 1 && ' - '}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default BookCard;
