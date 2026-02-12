import React from 'react';
import { Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IoIosMore } from 'react-icons/io';
import { MdLock, MdLockOpen } from 'react-icons/md';
import { User } from '@/interfaces/commom';

interface UserActionButtonsProps {
  handleUpdate: () => void;
  handleDelete: (value: any) => void;
  handleUpdateUserStatus: (val: any) => void;
  record: User;
}

const UserActionButtons: React.FC<UserActionButtonsProps> = ({
  handleUpdateUserStatus,
  handleUpdate,
  handleDelete,
  record,
}) => {
  const menuItems = [
    {
      key: 'edit',
      label: (
        <div
          onClick={handleUpdate}
          className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
        >
          <EditOutlined
            style={{ color: '#25396f', fontSize: '14px', marginRight: '8px' }}
          />
          Sửa
        </div>
      ),
    },

    {
      key: 'delete',
      label: (
        <div
          onClick={handleDelete}
          className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
        >
          <DeleteOutlined
            style={{ color: '#FF0000', fontSize: '14px', marginRight: '8px' }}
          />
          Xóa
        </div>
      ),
    },
    {
      key: 'banOrUnBan',
      label: (
        <div
          onClick={handleUpdateUserStatus}
          className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
        >
          {record.status === 'active' ? (
            <>
              <MdLock
                className="text-yellow-500 hover:text-yellow-600 mr-2"
                size={16}
              />
              Khóa người dùng
            </>
          ) : (
            <>
              <MdLockOpen
                className="text-green-500 hover:text-green-600 mr-2"
                size={16}
              />
              Mở khóa người dùng
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      className="cursor-pointer"
    >
      <IoIosMore className="cursor-pointer" />
    </Dropdown>
  );
};

export default UserActionButtons;
