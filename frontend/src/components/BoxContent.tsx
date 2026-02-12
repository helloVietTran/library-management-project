import React from 'react';
import { cn } from '@/utils/cn';

interface BoxContentProps {
  children: React.ReactNode;
  className?: string;
}

const BoxContent: React.FC<BoxContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={cn('p-4 bg-white rounded-lg shadow', className)}>
      {children}
    </div>
  );
};

export default BoxContent;
