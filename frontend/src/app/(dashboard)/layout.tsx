'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import api from '@/config/axios';
import useAuthStore from '@/store/authStore';
import { ApiResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<ApiResponse<User>>('/users/my');
        login(res.data.data);
      } catch (err) {
        console.error('Lỗi xác thực người dùng:', err);
        router.replace('/login');
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchUser();
  }, [login, router]);

  if (checkingAuth) {
    return null;
  }
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-main-bg md:ml-[280px] lg:ml-[300px] p-6">
        {children}
      </div>
    </>
  );
};

export default SidebarLayout;
