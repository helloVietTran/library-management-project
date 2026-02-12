'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { App, Menu, Drawer } from 'antd';
import {
  BiPen,
  BiSolidGridAlt
} from 'react-icons/bi';
import {
  AiOutlineUsergroupDelete
} from 'react-icons/ai';
import {
  IoArrowUndoOutline,
} from 'react-icons/io5';
import { BsChatLeftDots } from 'react-icons/bs';
import { GiChart } from 'react-icons/gi';
import { TbMoneybag } from 'react-icons/tb';
import { LuBookCopy } from 'react-icons/lu';
import { CiLogout } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import api from '@/config/axios';
import { clearAuthFromSession } from '@/utils/auth';

const Sidebar = () => {
  const { message } = App.useApp();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [openDrawer, setOpenDrawer] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const accessToken = sessionStorage.getItem('lib_jwt_token');
      const res = await api.post('/auth/logout', { accessToken });
      return res.data;
    },
    onSuccess: () => {
      message.success('Đăng xuất thành công!');
      logout();
      clearAuthFromSession();
      router.push('/login');
    },
    onError: () => {
      message.error('Đăng xuất thất bại!');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setOpenDrawer(false);
  };

  const menuItems = [
    {
      key: 'dashboard',
      label: <Link href="/">Tổng quan</Link>,
      icon: <BiSolidGridAlt size={18} />,
    },
    {
      key: 'books',
      label: <Link href="/books">QL sách</Link>,
      icon: <LuBookCopy size={18} />,
    },
    {
      key: 'borrow-return',
      label: <Link href="/borrow-return">QL mượn trả sách</Link>,
      icon: <IoArrowUndoOutline size={18} />,
    },
    {
      key: 'users',
      label: <Link href="/users">QL người dùng</Link>,
      icon: <AiOutlineUsergroupDelete size={20} />,
    },
    {
      key: 'authors',
      label: <Link href="/authors">QL tác giả</Link>,
      icon: <BiPen size={18} />,
    },
    {
      key: 'fines',
      label: <Link href="/fines">QL khoản phạt</Link>,
      icon: <TbMoneybag size={18} />,
    },
    {
      key: 'chat-app',
      label: <Link href="/chat-app">Chat App</Link>,
      icon: <BsChatLeftDots size={18} />,
    },
    {
      key: 'statistic',
      label: <Link href="/statistic">Thống kê</Link>,
      icon: <GiChart size={16} />,
    },
    {
      key: 'logout',
      label: <span> Đăng xuất</span>,
      icon: <CiLogout size={18} />,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="block md:hidden">
        <button
          className='cursor-pointer p-1 rounded-sm bg-gray-200 shadow-sm hover:bg-gray-300 ml-2.5 fixed top-4 left-4 z-20'
          onClick={() => setOpenDrawer(true)}
        >
          <RxHamburgerMenu size={24} className='text-primary' />
        </button>
      </div>

      <div className="md:w-[280px] lg:w-[300px] h-screen fixed top-0 bottom-0 z-10 overflow-y-auto">
        <div className="hidden md:block px-8 mt-8 mb-4">
          <Link href="/">
            <img src="/img/logo/logo.png" className="w-[60px] mx-auto" alt="logo" />
          </Link>
        </div>

        {/* Sidebar for large screens */}
        <div className="sidebar-menu hidden md:block">
          <ul className="menu mt-6 px-6">
            <li className="text-primary px-4 my-6 mb-4 text-base list-none font-bold">
              Menu
            </li>
            <Menu
              className="custom-menu"
              theme="light"
              mode="inline"
              defaultSelectedKeys={['dashboard']}
              items={menuItems}
            />
          </ul>
        </div>
      </div>


      {/* Drawer for small screens */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">Menu</span>
            <IoClose size={24} onClick={() => setOpenDrawer(false)} className="cursor-pointer" />
          </div>
        }
        placement="left"
        closable={false}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={300}
      >
        <Menu
          className='custom-menu'
          theme="light"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={() => setOpenDrawer(false)}
        />
      </Drawer>
    </>
  );
};

export default Sidebar;
