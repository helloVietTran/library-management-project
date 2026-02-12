import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { CgMoreO } from 'react-icons/cg';
import { GoBlocked } from 'react-icons/go';
import { AiOutlineSafety } from 'react-icons/ai';

import translateRole from '@/utils/translateRole';
import { User } from '@/interfaces/commom';
import useBorrowedQuantity from '../hooks/useBorrowedQuantity';
import useAuthStore from '@/store/authStore';

interface UserHeaderProps {
  data: User;
}

const UserHeader: React.FC<UserHeaderProps> = ({ data }) => {
  const { user: currentUser } = useAuthStore();

  const {data: borrowedQuantityData } = useBorrowedQuantity(data._id);

  // không thể sửa chính bản thân
  const isDisabled = currentUser?._id === data._id;

  const menuItems = [
    {
      key: 'block-user',
      label: (
        <div
          className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
        >
          <GoBlocked className="text-red-500 mr-2 size-4" />
          Chặn người dùng
        </div>
      ),
    },
    {
      key: 'promote-user-by-admin',
      label: (
        <div
          className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
        >
          <AiOutlineSafety className="text-blue-500 mr-2" />
          Phân quyền
        </div>
      ),
      children: [
        {
          key: 'promote-librarian',
          label: (
            <div className="flex items-center">
              <AiOutlineSafety className="text-green-500 mr-2" />
              Thủ thư
            </div>
          ),
        },
        {
          key: 'promote-user',
          label: (
            <div className="flex items-center">
              <AiOutlineSafety className="text-purple-500 mr-2" />
              Người dùng
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-xl font-bold text-primary">{data.fullName}</h2>
          <div className="flex sm:items-center flex-col sm:flex-row  gap-2 text-gray-500 text-sm mt-2">
            <span>@{data.email}</span>
            <span className="px-2 py-1 bg-gray-800 text-white rounded-full text-xs w-max">
              {translateRole(data?.role?.name || "user")}
            </span>
          </div>
        </div>
        <Avatar
          src={data.avatar || '/img/default/default-avatar.png'}
          alt={data.fullName}
          size={64}
        />
      </div>

      <p className="text-gray-700 text-sm mt-4 mb-2">
        {data?.bio || 'Loving books, coding, and coffee ☕'}
      </p>

      <div className="flex justify-between items-center text-gray-500 text-sm w-full">
        <div className="flex gap-2 items-center">
          <span>Đã đọc: {data.readBooksCount}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <span className="text-blue-500">Đang mượn: {borrowedQuantityData?.data.quantity || 0}</span>
        </div>

        {!isDisabled && (
          <div className="flex gap-3">
            <Dropdown
              menu={{ items: menuItems }}
              trigger={['click']}
              className="cursor-pointer"
            >
              <CgMoreO size={22} className="cursor-pointer" />
            </Dropdown>
          </div>
        )}
      </div>

      <span className="pb-2 font-semibold border-b-2 border-black cursor-pointer mt-6 mb-2">
        Bình luận
      </span>
    </div>
  );
};

export default UserHeader;
