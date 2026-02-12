import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm pt-4 mt-8 px-6 border-t">
      <div className="mb-2 md:mb-0">
        © 2025, Vbrary project. Made <span className="text-red-500">❤️</span>{' '}
        by{' '}
        <a href="#" className="font-semibold hover:underline">
          VietTran
        </a>
      </div>
      <div className="flex space-x-4">
        <Link href="#" className="hover:underline">
          About me
        </Link>
        <Link
          href="https://web.facebook.com/anh.tranviet.3386"
          target="_blank"
          className="hover:underline"
        >
          Facebook
        </Link>
      </div>
    </div>
  );
};

export default Footer;
