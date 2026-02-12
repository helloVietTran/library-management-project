import React, { useState } from 'react';
import {
  Table,
  TableColumnsType,
  Avatar,
  Tag,
  Select,
  Button,
  App,
} from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';

import BoxContent from '@/components/BoxContent';
import Pagination from '@/components/Pagination';
import DataTableHeader from '@/components/DataTableHeader';
import useFetchBorrowRecords from '../hooks/useFetchBorrowRecords';
import ExportDropdown from '@/components/ExportDropdown';
import dowloadExcel from '@/utils/downloadExcel';
import downloadPDF from '@/utils/dowloadPDF';
import BorrowModal from './BorrowModal';
import BorrowReturnActions from './BorrowReturnActions';
import OverdueEmailTemplate from './OverdueEmailTemplate';
import SendEmailModal from '@/components/SendEmailModal';
import ReturnBookModal from './ReturnBookModal';
import useSendEmail from '../hooks/useSendEmail';
import { BorrowRecord, User, Book } from '@/interfaces/commom';
import Loader from '@/components/Loader'
import Footer from '@/components/Footer';

const emailTemplates = [
  {
    key: 'overdue',
    label: 'Mẫu thông báo quá hạn trả sách',
    component: OverdueEmailTemplate,
  },
];

const BorrowTable: React.FC = () => {
  const { message } = App.useApp();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');

  const [filter, setFilter] = useState('all');
  const [selectedData, setSelectedData] = useState<BorrowRecord | null>(null);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState<boolean>(false);

  // Gọi API
  const { data: borrowPaginatedData, isLoading } = useFetchBorrowRecords(
    currentPage,
    pageSize,
    searchValue,
    filter
  );

  const sendMailMutation = useSendEmail();

  if (!borrowPaginatedData || !borrowPaginatedData?.data) {
    return <Loader />;
  }

  const borrowData = borrowPaginatedData?.data;

  // Hàm xử lý các sự kiện
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearch = (value: string) => setSearchValue(value);
  const handlePageSizeChange = (value: number) => setPageSize(value);

  const handleReceive = (record: BorrowRecord) => {
    setSelectedData(record);
    setOpenReturnModal(true);
  };

  const handleChange = (value: string) => setFilter(value);

  // Hàm gửi email
  const handleSendEmail = () => {
    if (selectedData)
      sendMailMutation.mutate({
        receiver: selectedData.user.email,
        recordId: selectedData._id,
      });

    setIsOpenEmailModal(false);
  };

  const handleNotify = (record: BorrowRecord) => {
    const isOverdue = record.dueDate
      ? dayjs().isAfter(dayjs(record.dueDate))
      : false;

    if (!isOverdue) {
      message.info('Người này chưa quá hạn trả sách');
      return;
    }

    setSelectedData(record);
    setIsOpenEmailModal(true);
  };

  const statusMap: Record<string, { color: string; text: string }> = {
    ok: { color: 'green', text: 'Bình thường' },
    lost: { color: 'volcano', text: 'Mất sách' },
    break: { color: 'red', text: 'Hư hỏng' },
  };

  const renderStatusTag = (status: string) => {
    const tag = statusMap[status] || {
      color: 'default',
      text: 'Không xác định',
    };
    return <Tag color={tag.color}>{tag.text}</Tag>;
  };

  // Định nghĩa cột bảng
  const columns: TableColumnsType<BorrowRecord> = [
    {
      title: '',
      key: 'action',
      render: (_: BorrowRecord, record: BorrowRecord) =>
        !record.returnDate ? (
          <BorrowReturnActions
            record={record}
            onReceiveBook={handleReceive}
            onNotifyUser={handleNotify}
          />
        ) : null,
    },
    {
      title: 'Người mượn',
      dataIndex: 'user',
      key: 'user',
      render: (user: User | null) => {
        if (!user) return null;
        return (
          <Link
            href={`/users/${user._id}`}
            className="flex items-center gap-4"
          >
            <Avatar
              size={32}
              src={user.avatar || null}
              style={{
                backgroundColor: !user.avatar ? '#f56a00' : 'transparent',
                color: !user.avatar ? '#fff' : undefined,
              }}
            >
              {!user.avatar ? user.fullName.charAt(0).toUpperCase() : null}
            </Avatar>
            <span>{user.fullName}</span>
          </Link>
        );
      },
      sorter: (a, b) => a.user?.fullName?.localeCompare(b.user?.fullName) ?? 0,
    },
    {
      title: 'Đang mượn',
      dataIndex: 'book',
      key: 'book',
      render: (book: Book | null) => {
        if (!book) return null;
        return (
          <Link
            href={`/books/${book._id}`}
            className="flex items-center gap-4"
          >
            <Avatar
              shape="square"
              size={32}
              src={book.coverImage || null}
              style={{
                backgroundColor: !book.coverImage ? '#87d068' : 'transparent',
                color: !book.coverImage ? '#fff' : undefined,
              }}
            >
              {!book.coverImage ? book.title.charAt(0).toUpperCase() : null}
            </Avatar>
            <span>{book.title}</span>
          </Link>
        );
      },
    },
    {
      title: 'Ngày mượn',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => dayjs(createdAt).format('DD-M-YYYY'),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Hạn trả',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate) => dayjs(dueDate).format('DD-M-YYYY'),
    },
    {
      title: 'Ngày trả',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (_: any, record: BorrowRecord) => {
        const { returnDate, dueDate } = record;

        if (returnDate) {
          return dayjs(returnDate).format('DD-MM-YYYY');
        }

        const now = dayjs();
        const due = dayjs(dueDate);

        if (now.isAfter(due)) {
          const overdueDays = now.diff(due, 'day');
          return (
            <Tag color='volcano'>
              Quá hạn {overdueDays} ngày
            </Tag>
          );
        }

        return <Tag color='green'>Chưa đến hạn</Tag>;
      },
    },
    {
      title: 'Tình trạng sách lúc mượn',
      dataIndex: 'status',
      key: 'status',
      render: renderStatusTag,
    },

    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (note) => (note?.trim() ? note : 'Không có'),
    },
  ];

  // Export file
  const headers = [
    { id: 'user.fullName', header: 'Tên người mượn' },
    { id: 'book.title', header: 'Sách mượn' },
    { id: 'dueDate', header: 'Ngày hết hạn trả' },
    { id: 'returnDate', header: 'Ngày trả' },
    { id: 'status', header: 'Trạng thái sách' },
  ];
  const handleExportExcel = () => {
    if (!borrowData) {
      message.warning('Vui lòng chờ tải dữ liệu');
      return;
    }
    dowloadExcel(borrowData, headers, 'Data mượn trả sách');
  };

  const handleExportPDF = () => {
    if (!borrowData) {
      message.warning('Vui lòng chờ tải dữ liệu');
      return;
    }
    downloadPDF(borrowData, headers, 'Data mượn trả sách');
  };

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <Select defaultValue="all" onChange={handleChange}>
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="not-returned">Chưa trả</Select.Option>
          <Select.Option value="returned">Đã trả</Select.Option>
        </Select>

        <div className="flex items-center sm:gap-2">
          <ExportDropdown
            downloadExcel={handleExportExcel}
            downloadPDF={handleExportPDF}
          />
          <Button
            onClick={() => setOpenModal(true)}
            type="primary"
            size="middle"
            className="text-sm"
          >
            Cho mượn sách
          </Button>
        </div>
      </div>
      <BoxContent>
        <DataTableHeader
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          searchValue={searchValue}
          searchPlaceholder="Tìm kiếm lịch sử mượn trả"
          pageSize={pageSize}

        />
        <Table
          columns={columns}
          dataSource={borrowData || []}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
          loading={isLoading}
        />
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalElement={borrowPaginatedData.totalItems}
            handlePageChange={handlePageChange}
          />
        </div>
      </BoxContent>

      <BorrowModal openModal={openModal} setOpenModal={setOpenModal} />

      <SendEmailModal
        open={isOpenEmailModal}
        onClose={() => setIsOpenEmailModal(false)}
        emailTemplates={emailTemplates}
        templateProps={{
          name: selectedData?.user.fullName,
          bookTitle: selectedData?.book.title,
          dueDate: selectedData?.dueDate,
          borrowDate: selectedData?.createdAt,
        }}
        title="Gửi mail yêu cầu trả sách"
        onOK={handleSendEmail}
      />

      <ReturnBookModal
        openModal={openReturnModal}
        setOpenModal={setOpenReturnModal}
        recordId={selectedData?._id}
      />
      <Footer />
    </>
  );
};

export default BorrowTable;
