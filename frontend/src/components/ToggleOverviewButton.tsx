import React from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface ToggleOverviewButtonProps {
  setOpenOverview: () => void;
  openOverview: boolean;
}

const ToggleOverviewButton: React.FC<ToggleOverviewButtonProps> = ({
  openOverview,
  setOpenOverview,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button onClick={setOpenOverview} className="flex items-center">
        {openOverview ? (
          <IoEyeOutline size={18} className="text-gray-500" />
        ) : (
          <IoEyeOffOutline size={18} className="text-gray-500" />
        )}
        <span className="ml-2 font-semibold text-sm text-gray-500 hover:underline">
          {openOverview ? 'Ẩn tổng quan' : 'Hiện tổng quan'}
        </span>
      </button>
    </div>
  );
};

export default ToggleOverviewButton;
