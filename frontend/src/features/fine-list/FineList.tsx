import React from 'react';
import PageTitle from '@/components/PageTitle';
import FineTable from './components/FineTable';

const FineList = () => {
  return (
    <div className="fine-list">
      <PageTitle
        title="Quản lý khoản phạt"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'QL khoản phạt', href: '/fines', isActive: true },
        ]}
      />

      <FineTable />
    </div>
  );
};

export default FineList;
