import React from 'react';
import { Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IoIosMore } from 'react-icons/io';
import { FaRegBell } from 'react-icons/fa';

interface ActionButtonsProps {
  handleUpdate: () => void;
  handleDelete?: (value: any) => void;
  handleNotification?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleNotification,
  handleUpdate,
  handleDelete,
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

    ...(handleDelete
      ? [
          {
            key: 'delete',
            label: (
              <div
                onClick={handleDelete}
                className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
              >
                <DeleteOutlined
                  style={{
                    color: '#FF0000',
                    fontSize: '14px',
                    marginRight: '8px',
                  }}
                />
                Xóa
              </div>
            ),
          },
        ]
      : []),
    ...(handleNotification
      ? [
          {
            key: 'notification',
            label: (
              <div
                onClick={handleNotification}
                className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
              >
                <FaRegBell
                  className="text-yellow-500 hover:text-yellow-600 mr-2"
                  size={16}
                />
                Thông báo
              </div>
            ),
          },
        ]
      : []),
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

export default ActionButtons;
