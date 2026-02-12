import { Book } from '@/interfaces/commom';
import React from 'react';

interface TitleItem {
  label: string;
  key: string;
}

type BookMetaFields = Pick<Book, 'pageCount' | 'publisher' | 'language'>;

interface BookInfoProps {
  titles: TitleItem[];
  content: BookMetaFields;
  genres?: string[];
  className?: string;
}

const BookInfo: React.FC<BookInfoProps> = ({
  titles,
  content,
  genres,
  className,
}) => {
  return (
    <div className={`table border-spacing-3 border-separate w-full ${className}`}>
      {titles.map((title, index) => {
        const value = content[title.key as keyof BookMetaFields];
        const isEmpty = value === undefined || value === null || value === '';

        return (
          <div
            key={index}
            className="table-row"
            style={{ display: isEmpty ? 'none' : 'table-row' }}
          >
            <div className="info-table-title table-cell font-semibold text-primary text-sm">
              {title.label}
            </div>
            <div className="table-cell">{value}</div>
          </div>
        );
      })}

      {genres && genres.length > 0 && (
        <div className="table-row">
          <div className="info-table-title table-cell font-semibold text-primary text-sm">
            Thể loại
          </div>
          <div className="table-cell">
            {genres.map((genre) => (
              <span key={genre} className="genre-btn">
                <span className="genre-tag">{genre}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
