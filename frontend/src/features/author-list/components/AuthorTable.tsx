import React, { useState } from 'react';
import { Table, TableColumnsType, Avatar } from 'antd';
import Link from 'next/link';

import BoxContent from '@/components/BoxContent';
import Pagination from '@/components/Pagination';
import DataTableHeader from '@/components/DataTableHeader';
import ActionButtons from '@/components/ActionButtons';
import useDebounce from '@/hooks/useDebounce';
import useFetchAuthors from '../hooks/useFetchAuthors';
import AuthorModal from './AuthorModal';
import Footer from '@/components/Footer';
import { Author } from '@/interfaces/commom';
import SplashScreen from '@/components/SplashScreen';

const AuthorTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const {
    data: authorData,
    isLoading,
    error,
  } = useFetchAuthors(currentPage, pageSize, debouncedSearchValue);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const columns: TableColumnsType<Author> = [
    {
      title: '',
      key: 'action',
      render: (_: Author, record: Author) => (
        <ActionButtons
          handleUpdate={() => {
            setSelectedAuthor(record);
            setOpenModal(true);
          }}
        />
      ),
    },
    {
      title: 'Tên tác giả',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Author) => (
        <Link href={`/authors/${record._id}`} className="flex items-center gap-4">
          <Avatar
            size={32}
            src={record.imgSrc || null}
            style={{
              backgroundColor: !record.imgSrc ? '#f56a00' : 'transparent',
              color: !record.imgSrc ? '#fff' : undefined,
            }}
          >
            {!record.imgSrc ? record.name.charAt(0).toUpperCase() : null}
          </Avatar>
          <span>{text}</span>
        </Link>
      ),
      sorter: (a: Author, b: Author) => a.name.localeCompare(b.name),
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'biography',
      key: 'biography',
      width: 400,
      render: (text: string) => (
        <div className="line-clamp-3 overflow-hidden text-ellipsis">{text}</div>
      ),
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Quốc tịch',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
      title: 'Giải thưởng',
      dataIndex: 'awards',
      key: 'awards',
      minWidth: 200,
      render: (text: string[]) => <p>{text.join(', ')}</p>,
    },
  ];

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Lỗi khi tải dữ liệu tác giả.
      </div>
    );
  }

  return (
    <>
      {isLoading ? <SplashScreen /> : <></>}
      <BoxContent>
        <DataTableHeader
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          searchValue={searchValue}
          searchPlaceholder="Tìm kiếm tác giả"
          pageSize={pageSize}
        />

        <Table
          columns={columns}
          dataSource={authorData?.data}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
          loading={isLoading}
        />

        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalElement={authorData?.totalItems || 0}
            handlePageChange={handlePageChange}
          />
        </div>

        <AuthorModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          authorId={selectedAuthor?._id}
        />

      </BoxContent>

      <Footer />
    </>
  );
};

export default AuthorTable;
