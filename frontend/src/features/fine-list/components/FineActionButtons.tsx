import React from 'react';
import { Dropdown } from 'antd';
import { IoIosMore } from 'react-icons/io';
import { BsCash } from 'react-icons/bs';

interface FineActionButtonsProps {
  handleConfirmPayment: () => void;
}

const FineActionButtons: React.FC<FineActionButtonsProps> = ({
  handleConfirmPayment,
}) => {
  const menuItems = [
    {
      key: 'confirmPayment',
      label: (
        <div
          onClick={handleConfirmPayment}
          className="flex items-center cursor-pointer text-gray-600 font-semibold px-2"
        >
          <BsCash
            className="text-green-600 hover:text-green-700 mr-2"
            size={16}
          />
          Xác nhận thu tiền
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

export default FineActionButtons;
