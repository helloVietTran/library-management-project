import React, { useState } from 'react';
import { Table, TableColumnsType, Tag, Select } from 'antd';
import dayjs from 'dayjs';

import BoxContent from '@/components/BoxContent';
import Pagination from '@/components/Pagination';
import DataTableHeader from '@/components/DataTableHeader';
import Loader from '@/components/Loader';
import useFetchFines from '../hooks/useFetchFines';
import FineActionButtons from './FineActionButtons';
import FineModal from './FineModal';
import { BorrowRecord, Fine, PaymentMethod } from '@/interfaces/commom';
import Footer from '@/components/Footer';
import { translatePaymentMethod } from '@/utils/translatePaymentMethod'

const FineTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { data: fineData, isLoading } = useFetchFines(
    currentPage,
    pageSize,
    searchValue,
    filter
  );

  const handleSelectChange = (val: string) => {
    setFilter(val);
  };

  const handlePaidFine = (fine: Fine) => {
    setSelectedFine(fine);
    setIsConfirmModalOpen(true);
  };


  const columns: TableColumnsType<Fine> = [
    {
      title: '',
      key: 'action',
      render: (_: Fine, record: Fine) =>
        !record.paid ? (
          <FineActionButtons
            handleConfirmPayment={() => handlePaidFine(record)}
          />
        ) : null,
    },
    {
      title: 'Ngày phát sinh',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Sách',
      dataIndex: ['borrowRecord'],
      key: 'bookTitle',
      render: (borrowRecord: BorrowRecord) => borrowRecord.book.title,
    },
    {
      title: 'Người mượn',
      dataIndex: ['borrowRecord'],
      key: 'borrower',
      render: (borrowRecord: BorrowRecord) => borrowRecord.user.fullName,
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span style={{ color: 'red' }}>{amount.toLocaleString()}đ</span>
      ),
    },
    {
      title: 'Đã thanh toán',
      dataIndex: 'paidDate',
      key: 'paidDate',
      render: (paidDate: string) => (
        <Tag color={paidDate ? 'green' : 'volcano'}>
          {paidDate ? 'Đã thanh toán' : 'Chưa thanh toán' }
        </Tag>
      ),
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'paidDate',
      key: 'paidDate',
      render: (date: string | undefined) =>
        date ? dayjs(date).format('DD/MM/YYYY') : 'Chưa thanh toán',
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method: PaymentMethod | undefined) => translatePaymentMethod(method),
    },
    {
      title: 'Người thu',
      dataIndex: 'collectedBy',
      key: 'collectedBy',
      render: (collectedBy: { fullName?: string }) =>
        collectedBy?.fullName || 'Chưa thu',
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <Select value={filter} onChange={handleSelectChange}>
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="false">Chưa thu</Select.Option>
          <Select.Option value="true">Đã thu</Select.Option>
        </Select>
      </div>
      <BoxContent>
        <DataTableHeader
          onPageSizeChange={setPageSize}
          onSearch={setSearchValue}
          searchValue={searchValue}
          searchPlaceholder="Tìm kiếm khoản phạt"
          pageSize={pageSize}
        />

        <Table
          columns={columns}
          dataSource={fineData?.data}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />

        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalElement={fineData?.totalItems || 0}
            handlePageChange={setCurrentPage}
          />
        </div>

        <FineModal
          openModal={isConfirmModalOpen}
          setOpenModal={setIsConfirmModalOpen}
          fineId={selectedFine?._id}
        />
      </BoxContent>
      <Footer />
    </>
  );
};

export default FineTable;
