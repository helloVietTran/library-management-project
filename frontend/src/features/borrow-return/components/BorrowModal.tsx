import React, { useState } from 'react';
import { Modal, DatePicker, message, Form, Select } from 'antd';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

import api from '@/config/axios';
import { useCreateBorrowRecord } from '../hooks/useCreateBorrowRecord';
import { Book, User } from '@/interfaces/commom';

interface BorrowModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const [form] = Form.useForm();

  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const createBorrowRecord = useCreateBorrowRecord(handleCancel);

  // lấy gợi ý user
  const fetchUserSuggestions = debounce(async (searchText: string) => {
    if (!searchText.trim()) {
      setUsers([]);
      return;
    }

    setLoadingUser(true);
    try {
      const response = await api.get(`/users`, {
        params: { search: searchText },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Lỗi khi tìm người dùng:', error);
    } finally {
      setLoadingUser(false);
    }
  }, 500);

  // lấy gợi ý sách
  const fetchBookSuggestions = debounce(async (searchText: string) => {
    if (!searchText.trim()) {
      setBooks([]);
      return;
    }

    setLoadingBook(true);
    try {
      const response = await api.get(`/books`, {
        params: { search: searchText },
      });
      setBooks(response.data.data);
    } catch (error) {
      console.error('Lỗi khi tìm sách:', error);
    } finally {
      setLoadingBook(false);
    }
  }, 500);

  // lấy _id từ sách
  const handleSelectBook = (bookId: string) => {
    const selectedBook = books.find((book) => book._id === bookId);
    if (selectedBook) {
      form.setFieldsValue({ bookId });
    }
  };

  // lấy _id từ người dùng
  const handleSelectUser = (userId: string) => {
    const selectedUser = users.find((user) => user._id === userId);
    if (selectedUser) {
      form.setFieldsValue({ userId: userId });
    }
  };

  // ok
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.dueDate = values.dueDate.toISOString();
        console.log(values);
        createBorrowRecord.mutate(values);
      })
      .catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
      });
  };

  return (
    <Modal
      title={
        <h1 className="text-primary text-xl font-semibold mb-2 pb-2 border-b border-gray-300 text-center">
          Lập phiếu mượn
        </h1>
      }
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        name="borrowForm"
        initialValues={{
          userId: '',
          bookId: '',
          dueDate: dayjs().add(7, 'day'),
        }}
        requiredMark={false}
        className="space-y-4"
      >
        <Form.Item
          name="userId"
          label="Tên người mượn"
          rules={[{ required: true, message: 'Tên người mượn là bắt buộc.' }]}
        >
          <Select
            showSearch
            placeholder="Nhập tên người mượn"
            onSearch={fetchUserSuggestions}
            onSelect={handleSelectUser}
            loading={loadingUser}
            filterOption={false}
            size="large"
          >
            {users.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="bookId"
          label="Tên sách"
          rules={[{ required: true, message: 'Tên sách mượn là bắt buộc.' }]}
        >
          <Select
            showSearch
            placeholder="Nhập tên sách"
            onSearch={fetchBookSuggestions}
            onSelect={handleSelectBook}
            loading={loadingBook}
            filterOption={false}
            size="large"
          >
            {books.map((book) => (
              <Select.Option key={book._id} value={book._id}>
                {book.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="dueDate"
          label="Ngày dự kiến trả"
          rules={[{ required: true, message: 'Ngày dự kiến trả là bắt buộc.' }]}
        >
          <DatePicker size="large" format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BorrowModal;
