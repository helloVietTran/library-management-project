import React from 'react';
import BorrowTable from './components/BorrowTable';
import PageTitle from '@/components/PageTitle';

const BorrowReturnList = () => {
  return (
    <div className="borrow-return">
      <PageTitle
        title="QL mượn trả"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'QL mượn trả', href: '/borrow-return', isActive: true },
        ]}
      />
      <BorrowTable />
    </div>
  );
};

export default BorrowReturnList;
