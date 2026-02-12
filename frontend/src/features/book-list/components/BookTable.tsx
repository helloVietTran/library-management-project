import React, { Key, useState } from 'react';
import { Table, Button, message, Modal, Avatar, Tag } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { DeleteOutlined } from '@ant-design/icons';
import 'jspdf-autotable';
import Link from 'next/link';

import '@/config/font/TimesNewRoman';
import SplashScreen from '@/components/SplashScreen';
import ToggleOverviewButton from '@/components/ToggleOverviewButton';
import BookOverview from './BookOverview';
import DataTableHeader from '@/components/DataTableHeader';
import ExportDropdown from '@/components/ExportDropdown';
import dowloadExcel from '@/utils/downloadExcel';
import downloadPDF from '@/utils/dowloadPDF';
import Pagination from '@/components/Pagination';
import BoxContent from '@/components/BoxContent';
import ActionButtons from '@/components/ActionButtons';
import useFetchBooks from '../hooks/useFetchBooks';
import useDeleteManyBooks from '../hooks/useDeleteManyBooks';
import useDeleteBook from '../hooks/useDeleteBook';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';
import { Book } from '@/interfaces/commom';
import Footer from '@/components/Footer';

const BookTable: React.FC = () => {
  // Overview toggle
  const [openOverview, setOpenOverview] = useState<boolean>(true);

  // Table controls
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');

  // Row selection for bulk delete
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  // Single delete modal
  const [selectedBookId, setSelectedBookId] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Create / Update modals
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

  // Data & mutations
  const { data: bookData, isLoading: loadingBooks } = useFetchBooks(currentPage, pageSize, searchValue);
  const deleteManyMutation = useDeleteManyBooks();
  const deleteMutation = useDeleteBook();

  // Table headers for exports
  const headers = [
    { id: 'title', header: 'Tiêu đề' },
    { id: 'authors', header: 'Tác giả' },
    { id: 'publishedDate', header: 'Ngày xuất bản' },
    { id: 'language', header: 'Ngôn ngữ' },
    { id: 'pageCount', header: 'Số trang' },
    { id: 'price', header: 'Giá' },
  ];

  // Bulk delete
  const handleDeleteMany = () => {
    if (!selectedRowKeys.length) return;
    deleteManyMutation.mutate(selectedRowKeys as string[]);
    message.success(`Đã xoá ${selectedRowKeys.length} sách`);
    setSelectedRowKeys([]);
  };

  // Single delete
  const handleDelete = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsConfirmModalOpen(true);
  };
  const confirmDeleteBook = () => {
    deleteMutation.mutate(selectedBookId);
    setIsConfirmModalOpen(false);
  };

  // Exports
  const handleExportExcel = () => {
    if (!bookData?.data) {
      message.info('Đang tải dữ liệu');
      return;
    }
    dowloadExcel(bookData.data, headers, 'Book_Data');
  };
  const handleExportPDF = () => {
    if (!bookData?.data) {
      message.info('Đang tải dữ liệu');
      return;
    }
    downloadPDF(bookData.data, headers, 'Book_Data');
  };

  // Columns definition
  const columns = [
    {
      title: '',
      key: 'action',
      render: (_: any, record: Book) => (
        <ActionButtons
          handleUpdate={() => {
            setSelectedBookId(record._id);
            setOpenUpdateModal(true);
          }}
          handleDelete={() => handleDelete(record._id)}
        />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Book) => (
        <Link href={`/books/${record._id}`} className="flex items-center gap-2">
          <Avatar
            shape="square"
            size={32}
            src={record.coverImage || null}
            style={{
              backgroundColor: !record.coverImage ? '#87d068' : 'transparent',
              color: !record.coverImage ? '#fff' : undefined,
            }}
          >
            {!record.coverImage ? text.charAt(0).toUpperCase() : null}
          </Avatar>
          <span>{text}</span>
        </Link>
      ),
      sorter: (a: Book, b: Book) => a.title.localeCompare(b.title),
    },
    {
      title: 'Tác giả',
      dataIndex: 'authors',
      key: 'authors',
      render: (authors: { name: string }[]) => authors.map(a => a.name).join(', '),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span style={{ color: 'green' }}>{price.toLocaleString()}đ</span>,
    },
    {
      title: 'Thể loại',
      dataIndex: 'genres',
      key: 'genres',
      render: (genres: string[]) => genres.map(g => <Tag key={g} color="blue">{g}</Tag>),
    },
    { title: 'Nhà xuất bản', dataIndex: 'publisher', key: 'publisher' },
    {
      title: 'Ngày xuất bản',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      render: (date: string) => date || 'N/A',
    },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
  ];


  return (
    <>
      {loadingBooks ? <SplashScreen /> : <></>}
      <BookOverview openOverview={openOverview} />

      <div className="page-content">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <ToggleOverviewButton
              openOverview={openOverview}
              setOpenOverview={() => setOpenOverview(!openOverview)}
            />
            {selectedRowKeys.length > 0 && (
              <button
                className="text-gray-500 hover:text-red-500 relative cursor-pointer hover:bg-red-100 rounded-full p-1 transition-colors duration-200"
                onClick={handleDeleteMany}
              >
                <DeleteOutlined className="text-lg" />
                <span className="absolute top-0 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                  {selectedRowKeys.length}
                </span>
              </button>
            )}
          </div>

          <div className="flex gap-1 sm:gap-2 items-center">
            <ExportDropdown
              downloadExcel={handleExportExcel}
              downloadPDF={handleExportPDF}
            />
            <Button
              onClick={() => setOpenCreateModal(true)}
              type="primary"
              icon={<FiPlus size={18} />}
              size="middle"
            >
              Thêm
            </Button>
          </div>
        </div>

        <BoxContent>
          <DataTableHeader
            onPageSizeChange={setPageSize}
            onSearch={setSearchValue}
            searchValue={searchValue}
            searchPlaceholder="Tìm kiếm sách"
            pageSize={pageSize}
          />

          <Table
            columns={columns}
            dataSource={bookData?.data || []}
            rowKey="_id"
            pagination={false}
            scroll={{ x: 'max-content' }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            loading={loadingBooks}
          />

          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalElement={bookData?.totalItems || 0}
              handlePageChange={setCurrentPage}
            />
          </div>
        </BoxContent>

        <CreateBookModal
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
        />

        <UpdateBookModal
          openModal={openUpdateModal}
          setOpenModal={setOpenUpdateModal}
          bookId={selectedBookId}
        />

        <Modal
          title="Xác nhận xóa sách"
          open={isConfirmModalOpen}
          onOk={confirmDeleteBook}
          onCancel={() => setIsConfirmModalOpen(false)}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
        >
          <p>Bạn có chắc chắn muốn xóa sách này không?</p>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default BookTable;
