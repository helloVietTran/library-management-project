import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { FaFileExport } from 'react-icons/fa';

interface ExportDropdownProps {
  downloadPDF: () => void;
  downloadExcel: () => void;
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({
  downloadPDF,
  downloadExcel,
}) => {
  const menuItems: MenuProps['items'] = [
    {
      key: 'pdf',
      label: 'Xuất file PDF',
      onClick: downloadPDF,
    },
    {
      key: 'excel',
      label: 'Xuất file Excel',
      onClick: downloadExcel,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <span className="flex text-gray-500 font-semibold hover:text-gray-700 text-xs sm:text-sm mr-4 cursor-pointer">
        <FaFileExport size={16} className="mr-1 text-gray-500" />
        Xuất file
      </span>
    </Dropdown>
  );
};

export default ExportDropdown;
