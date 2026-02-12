import React, { useState } from 'react';
import { Modal, Input, Form, Select, Row, Col, InputNumber, App, DatePicker } from 'antd';
import debounce from 'lodash/debounce';

import api from '@/config/axios';
import { PaginatedResponse } from '@/interfaces/api-response';
import { useCreateBook } from '../hooks/useCreateBook';
import { Author } from '@/interfaces/commom';

interface CreateBookModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({ openModal, setOpenModal }) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();

    const [authorOptions, setAuthorOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const fetchAuthorSuggestions = debounce(async (searchText: string) => {
        try {
            const res = await api.get<PaginatedResponse<Author>>('/authors', {
                params: { search: searchText },
            });
            const options = res.data.data.map((author: Author) => ({
                label: author.name,
                value: author.name,
            }));
            setAuthorOptions(options);
        } catch (err) {
            console.error('Lỗi khi tìm tác giả:', err);
        }
    }, 300);

    const handleCancel = () => {
        form.resetFields();
        setOpenModal(false);
    };
    const createBookMutation = useCreateBook(handleCancel);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {

                if (values.publishedDate && values.publishedDate.format)
                    values.publishedDate = values.publishedDate.format('YYYY-MM-DD');

                console.log(values);
                createBookMutation.mutate(values);
            })
            .catch(() => {
                message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
            });
    };

    return (
        <Modal
            title={
                <h1 className="text-primary text-xl font-semibold pb-4 border-b border-gray-300">
                    Nhập thông tin sách
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
                name={"create-book-form"}
                initialValues={{
                    title: '',
                    description: '',
                    publishedDate: '',
                    pageCount: 1,
                    authors: [],
                    genres: [],
                    publisher: '',
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
                            name="authors"
                            label="Tác giả"
                            rules={[
                                { required: true, message: 'Danh sách tác giả là bắt buộc.' },
                            ]}
                        >
                            <Select
                                mode="tags"
                                size="large"
                                placeholder="Nhập tên tác giả"
                                options={authorOptions}
                                onSearch={fetchAuthorSuggestions}
                                value={selectedAuthors}
                                onSelect={(value) => {
                                    const updated = [...selectedAuthors, value];
                                    setSelectedAuthors(updated);
                                    form.setFieldValue('authors', updated);
                                }}
                                onDeselect={(value) => {
                                    const updated = selectedAuthors.filter(
                                        (item) => item !== value
                                    );
                                    setSelectedAuthors(updated);
                                    form.setFieldValue('authors', updated);
                                }}
                                allowClear
                            />
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

                        <Form.Item
                            name="pageCount"
                            label="Số trang"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số trang.' },
                                { type: 'number', min: 1, message: 'Số trang phải lớn hơn 0.' },
                            ]}
                        >
                            <InputNumber
                                size="large"
                                min={1}
                                style={{ width: '100%' }}
                                placeholder="Nhập số trang"
                            />
                        </Form.Item>

                        <Form.Item
                            name="file"
                            label="Ảnh bìa"
                            valuePropName="file"
                            getValueFromEvent={(e) => e?.target?.files?.[0]}
                        >
                            <Input size="large" type="file" accept="image/*" />
                        </Form.Item>
                        {form.getFieldValue('coverImage') && (
                            <img
                                src={form.getFieldValue('coverImage')}
                                alt="Ảnh bìa hiện tại"
                                className="rounded w-32 h-40 object-cover"
                            />
                        )}
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
                                { required: true, message: 'Vui lòng nhập thể loại' }
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

                        <Form.Item name="publisher" label="Nhà xuất bản">
                            <Input size="large" placeholder="Nhập nhà xuất bản" />
                        </Form.Item>

                        <Form.Item name="publishedDate" label="Ngày xuất bản" rules={[{ required: true, message: 'Vui lòng chọn ngày xuất bản' }]}>
                            <DatePicker
                                size="large"
                                style={{ width: '100%' }}
                                placeholder="Chọn ngày xuất bản"
                                format="DD/MM/YYYY"
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

                        <Form.Item name="description" label="Mô tả" rules={[
                            { required: true, message: 'Vui lòng nhập mô tả.' },

                        ]}>
                            <Input.TextArea size="large" placeholder="Nhập mô tả" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default CreateBookModal;
