import React from 'react';

interface TitleItem {
  label: string;
  key: string;
}

interface AuthorInfoProps {
  titles: TitleItem[];
  content: any;
  awards?: string[];
  className?: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  titles,
  content,
  awards,
  className,
}) => {
  return (
    <div
      className={`table border-spacing-4 border-separate w-full ${className}`}
    >
      {titles.map((title, index) => (
        <div className="table-row" key={index}>
          <div className="info-table-title table-cell font-semibold text-primary text-sm w-[15%]">
            {title.label}
          </div>
          <div className="table-cell">{content[title.key]}</div>
        </div>
      ))}

      {awards && awards.length > 0 && (
        <div className="table-row">
          <div className="info-table-title table-cell font-semibold text-primary text-sm w-[15%]">
            Giải thưởng
          </div>
          <div className="table-cell">
            {awards.map((award) => (
              <span key={award} className="award-badge">
                {award}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorInfo;
