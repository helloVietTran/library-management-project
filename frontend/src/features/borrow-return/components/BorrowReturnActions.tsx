import { Dropdown } from 'antd';
import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';

import { BorrowRecord } from '@/interfaces/commom';

interface BorrowReturnActionsProps {
  record: BorrowRecord;
  onReceiveBook: (record: any) => void;
  onNotifyUser: (record: any) => void;
}

const BorrowReturnActions: React.FC<BorrowReturnActionsProps> = ({
  record,
  onReceiveBook,
  onNotifyUser,
}) => {
  const menuItems = [
    {
      key: 'received-book',
      label: (
        <div
          onClick={() => onReceiveBook(record)}
          className="flex items-center gap-2 cursor-pointer font-semibold p-1"
        >
          <FaCheckCircle className="text-green-500" />
          <span>Nhận sách</span>
        </div>
      ),
    },
    {
      key: 'send-mail',
      label: (
        <div
          onClick={() => onNotifyUser(record)}
          className="flex items-center gap-2 cursor-pointer font-semibold p-1"
        >
          <FaEnvelope className="text-yellow-500" />
          <span>Gửi mail yêu cầu trả sách</span>
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

export default BorrowReturnActions;
