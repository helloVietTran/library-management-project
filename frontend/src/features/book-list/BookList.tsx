import React from 'react';
import PageTitle from '@/components/PageTitle';
import BookTable from './components/BookTable';

const BookList = () => {
  return (
    <div className="book-list overflow-x-hidden">
      <PageTitle
        title="Quản lý sách"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'QL sách', href: '/books', isActive: true },
        ]}
      />
      <BookTable />
    </div>
  );
};

export default BookList;