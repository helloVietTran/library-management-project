import React from 'react';
import { Avatar, Space } from 'antd';

import translateRole from '@/utils/translateRole';
import useMyInfo from '../hooks/useMyInfo';

const DashboardHeader = () => {
  const { data } = useMyInfo();

 
  if (!data?.data) return null;

  return (
    <div className="mb-4 border border-[#e8e8e8] rounded bg-gradient-to-r from-[#f0f9ff] to-[#cbebff] p-0">
      <header className="flex items-center justify-between p-4">
        <Space size="large">
          <Avatar size={60} src={data.data.avatar || null}>
            {!data.data.avatar && data.data.fullName.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <h2 className="text-primary text-sm md:text-xl font-semibold mb-2">
              {translateRole(data.data.role.name)}: {data.data.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 md:text-base">
              <span>Chào mừng {data.data.fullName} đến với hệ thống quản lý thư viện</span>
            </p>
          </div>
        </Space>

        <img
          src="/img/icon/result.png"
          alt="Thống kê"
          style={{ height: '64px', marginLeft: 'auto' }}
        />
      </header>
    </div>
  );
};

export default DashboardHeader;
