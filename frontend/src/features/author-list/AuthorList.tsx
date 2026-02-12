import React, { useState } from 'react';
import { Button } from 'antd';
import { FiPlus } from 'react-icons/fi';

import PageTitle from '@/components/PageTitle';
import AuthorTable from './components/AuthorTable';
import AuthorModal from './components/AuthorModal';

const AuthorList = () => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="author-list">
      <PageTitle
        title="Quản lý tác giả"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'QL tác giả', href: '/authors', isActive: true },
        ]}
      />
      <div className="page-content">
        <div className="flex justify-end mb-4">
          <Button
            onClick={showModal}
            type="primary"
            icon={<FiPlus size={18} />}
            size="middle"
            className="text-sm"
          >
            Thêm
          </Button>
        </div>
        <AuthorTable />

        <AuthorModal openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </div>
  );
};

export default AuthorList;
