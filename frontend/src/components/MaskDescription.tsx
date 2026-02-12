import { cn } from '@/utils/cn';
import React, { useState, useEffect, useRef } from 'react';

interface MaskDescriptionProps {
  content: string;
  className?: string;
}

const MaskDescription: React.FC<MaskDescriptionProps> = ({
  content,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight, offsetHeight } = contentRef.current;
      setHasMore(scrollHeight > offsetHeight); 
    }
  }, [content]);

  return (
    <div className={cn('mask-des', className)}>
      <p
        ref={contentRef}
        className={`description text-gray-700 ${
          isExpanded ? 'expanded' : 'collapsed'
        } ${hasMore ? 'has-more' : 'no-has-more'}`}
      >
        {content}
      </p>
      {hasMore && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 text-sm hover:underline mt-2"
        >
          {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
        </button>
      )}
    </div>
  );
};

export default MaskDescription;
