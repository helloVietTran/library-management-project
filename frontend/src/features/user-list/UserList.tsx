import React, { useState } from 'react';
import { Button } from 'antd';
import { FiPlus } from 'react-icons/fi';

import UserTable from './components/UserTable';
import PageTitle from '@/components/PageTitle';
import CreateUserModal from './components/CreateUserModal';

const UserList = () => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  };
  
  return (
    <div className="user-list">
      <PageTitle
        title="Quản lý người dùng"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'QL người dùng', href: '/user-list', isActive: true },
        ]}
      />
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
      <UserTable />

      <CreateUserModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default UserList;
