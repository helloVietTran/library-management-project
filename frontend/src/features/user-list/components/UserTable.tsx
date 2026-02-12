import React, { useState } from 'react';
import { Table, TableColumnsType, Avatar, Tag, Modal } from 'antd';
import Link from 'next/link';

import BoxContent from '@/components/BoxContent';
import Pagination from '@/components/Pagination';
import DataTableHeader from '@/components/DataTableHeader';
import UserModal from './UpdateUserModal';
import useFetchUsers from '../hooks/useFetchUsers';
import { Role, User } from '@/interfaces/commom';
import translateRole from '@/utils/translateRole';
import useAuthStore from '@/store/authStore';
import useDeleteUser from '../hooks/useDeleteUser';
import UserActionButtons from './UserActionButtons';
import useUpdateUserStatus from '../hooks/useUpdateUserStatus';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';

const UserTable = () => {
  const { user: currentUser } = useAuthStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);

  // Fetch users
  const { data: userData, isLoading } = useFetchUsers(
    currentPage,
    pageSize,
    searchValue
  );

  const deleteUserMutation = useDeleteUser();
  const updateUserStatusMutation = useUpdateUserStatus();

  // Xử lý xác nhận xóa
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  // Xóa người dùng sau khi xác nhận
  const confirmDeleteUser = () => {
    setIsConfirmModalOpen(false);
    if (!selectedUser) return;
    deleteUserMutation.mutate(selectedUser._id);
  };

  const handleUpdateUserStatus = (user: User) => {
    setSelectedUser(user);
    setIsBanModalOpen(true);
  };

  const confirmBanOrUnban = () => {
    if (!selectedUser) return;

    const newStatus = selectedUser.status === 'banned' ? 'active' : 'banned';

    updateUserStatusMutation.mutate({
      userId: selectedUser._id,
      status: newStatus,
    });

    setIsBanModalOpen(false);
  };

  // columns
  const columns: TableColumnsType<User> = [
    {
      title: '',
      key: 'action',
      render: (_: User, record: User) =>
        currentUser && currentUser._id !== record._id ? (
          <UserActionButtons
            handleUpdate={() => {
              setSelectedUser(record);
              setOpenModal(true);
            }}
            handleDelete={() => handleDelete(record)}
            handleUpdateUserStatus={() => handleUpdateUserStatus(record)}
            record={record}
          />
        ) : null,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text: string, record: User) => (
        <Link href={`/users/${record._id}`} className="flex items-center gap-4">
          <Avatar
            size={32}
            src={record.avatar || null}
            style={{
              backgroundColor: !record.avatar ? '#f56a00' : 'transparent',
              color: !record.avatar ? '#fff' : undefined,
            }}
          >
            {!record.avatar ? record.fullName.charAt(0).toUpperCase() : null}
          </Avatar>
          <span>{text}</span>
        </Link>
      ),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Số sách đã đọc',
      dataIndex: 'readBooksCount',
      key: 'readBooksCount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={status === 'active' ? 'green' : 'red'}
          style={{ borderRadius: '8px', padding: '4px 6px' }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: Role) => (
        <Tag color="cyan" style={{ borderRadius: '8px', padding: '4px 6px' }}>
          {translateRole(role.name)}
        </Tag>
      ),
    },
  ];


  return (
    <>
      {isLoading ? <SplashScreen /> : <></>}
      <BoxContent>
        <DataTableHeader
          onPageSizeChange={setPageSize}
          onSearch={setSearchValue}
          searchValue={searchValue}
          searchPlaceholder="Tìm kiếm người dùng"
          pageSize={pageSize}
        />

        <Table
          columns={columns}
          dataSource={userData?.data}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
          loading={isLoading}
        />

        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalElement={userData?.totalItems || 0}
            handlePageChange={setCurrentPage}
          />
        </div>

        <UserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          userId={selectedUser?._id}
        />

        {/* Modal xác nhận xóa */}
        <Modal
          title="Xác nhận xóa người dùng"
          open={isConfirmModalOpen}
          onOk={confirmDeleteUser}
          onCancel={() => setIsConfirmModalOpen(false)}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
        </Modal>

        <Modal
          title={
            selectedUser?.status === 'banned'
              ? 'Mở khóa người dùng'
              : 'Khóa người dùng'
          }
          open={isBanModalOpen}
          onOk={confirmBanOrUnban}
          onCancel={() => setIsBanModalOpen(false)}
          okText={selectedUser?.status === 'banned' ? 'Mở khóa' : 'Khóa'}
          cancelText="Hủy"
          okButtonProps={{ danger: selectedUser?.status !== 'banned' }}
        >
          <p>
            Bạn có chắc chắn muốn{' '}
            <span>
              {selectedUser?.status === 'banned' ? 'mở khóa' : 'khóa'}
            </span>{' '}
            người dùng này không?
          </p>
        </Modal>
      </BoxContent>

      <Footer />
    </>
  );
};

export default UserTable;
