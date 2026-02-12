'use client';
import { Button } from 'antd';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page container mx-auto">
      <div className="w-full md:w-8/12 mx-auto">
        <img
          className="mx-auto w-[600px]"
          src="/img/error/error-404.png"
          alt="Not Found"
        />
        <div className="text-center">
          <h1 className="text-3xl mt-4 font-bold text-primary">NOT FOUND</h1>
          <p className="text-xl mt-2 text-gray-600">
            Trang mà ban đang tìm kiếm không tồn tại
          </p>

          <Link href="/">
            <Button type="primary" size="large" className="mt-4">
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
