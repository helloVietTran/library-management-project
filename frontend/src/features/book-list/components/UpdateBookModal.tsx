import React, { useEffect } from 'react';
import {
  Modal,
  Input,
  App,
  Form,
  Select,
  Row,
  Col,
  InputNumber,
  DatePicker,
} from 'antd';

import { useUpdateBook } from '../hooks/useUpdateBook';
import { ApiResponse } from '@/interfaces/api-response';
import api from '@/config/axios';
import { Book } from '@/interfaces/commom';
import dayjs from 'dayjs';

interface UpdateBookModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  bookId: string;
}

const UpdateBookModal: React.FC<UpdateBookModalProps> = ({
  openModal,
  setOpenModal,
  bookId,
}) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  useEffect(() => {
    const getBookById = async () => {
      try {
        if (bookId) {
          const res = await api.get<ApiResponse<Book>>(`/books/${bookId}`);

          const bookData = res.data.data;
          form.setFieldsValue({
            ...bookData,
            publishedDate: bookData.publishedDate ? dayjs(bookData.publishedDate, "DD-MM-YYYY") : null
          });
        } else
          form.resetFields();

      } catch (error) {
        console.error('Lấy thông tin sách thất bại:', error);
      }
    };

    getBookById();
  }, [bookId, form, openModal]);

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };
  const updateBookMutation = useUpdateBook(bookId, handleCancel);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {

        if (values.publishedDate && values.publishedDate.format) {
          values.publishedDate = values.publishedDate.format('YYYY-MM-DD');
        }

        updateBookMutation.mutate(values);
      })
      .catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
      });
  };

  return (
    <Modal
      title={
        <h1 className="text-primary text-xl text-center font-semibold pb-4 border-b border-gray-300">
          Cập nhật thông tin sách
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
        name={bookId ? "update-book-form" : "create-book-form"}
        initialValues={{
          title: '',
          description: '',
          publishedDate: '',
          genres: [],
          quantity: 1,
          price: 1,
          file: null,
        }}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: 'Tiêu đề là bắt buộc.' }]}
            >
              <Input size="large" placeholder="Nhập tiêu đề" />
            </Form.Item>


            <Form.Item
              name="price"
              label="Giá bán"
              rules={[
                { required: true, message: 'Vui lòng nhập giá bán.' },
                { type: 'number', min: 1, message: 'Giá bán phải lớn hơn 0.' },
              ]}
            >
              <InputNumber
                size="large"
                min={1}
                style={{ width: '100%' }}
                placeholder="Nhập giá bán"
              />
            </Form.Item>


            <Form.Item name="publisher" label="Nhà xuất bản">
              <Input size="large" placeholder="Nhập nhà xuất bản" />
            </Form.Item>

            <Form.Item name="publishedDate" label="Ngày xuất bản">
              <DatePicker size="large" format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              name="file"
              label="Bìa sách"
              valuePropName="file"
              getValueFromEvent={(e) => e?.target?.files?.[0]}
            >
              <Input size="large" type="file" accept="image/*" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="genres"
              label="Thể loại"
              rules={[
                {
                  validator: (_, value) =>
                    Array.isArray(value)
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error('Thể loại phải là một mảng chuỗi.')
                      ),
                },
              ]}
            >
              <Select
                open={false}
                mode="tags"
                size="large"
                placeholder="Nhập danh sách thể loại"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[
                { required: true, message: 'Vui lòng nhập số lượng.' },
                { type: 'number', min: 1, message: 'Số lượng phải lớn hơn 0.' },
              ]}
            >
              <InputNumber
                size="large"
                min={1}
                style={{ width: '100%' }}
                placeholder="Nhập số lượng"
              />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
              <Input.TextArea size="large" placeholder="Nhập mô tả" rows={4} />
            </Form.Item>


          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateBookModal;
