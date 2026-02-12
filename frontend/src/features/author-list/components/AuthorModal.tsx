import React, { useEffect, useState } from 'react';
import { Modal, Input, message, Form, Row, Col, Select, DatePicker } from 'antd';
import { countries, ICountry } from 'countries-list';
import dayjs from 'dayjs';

import api from '@/config/axios';
import convertToFormData from '@/utils/convertFormData';
import useCreateOrUpdateAuthor from '../hooks/useCreateOrUpdateAuthor';
import { ApiResponse } from '@/interfaces/api-response';
import { Author } from '@/interfaces/commom';

interface AuthorModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  authorId?: string;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  openModal,
  setOpenModal,
  authorId,
}) => {
  const [form] = Form.useForm();
  const [countryOptions, setCountryOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    // gợi ý quốc tịch
    const countryList = Object.values(countries).map((country: ICountry) => ({
      label: country.name,
      value: country.name,
    }));

    setCountryOptions(countryList);

    if (authorId)
      api.get<ApiResponse<Author>>(`/authors/${authorId}`).then((res) => {
        const authorData = res.data.data;

        form.setFieldsValue({
          ...authorData,
          dob: authorData.dob ? dayjs(authorData.dob, "DD-MM-YYYY") : null,
          imgSrc: authorData.imgSrc,
        });
      });
    else form.resetFields();
  }, [authorId, form, openModal]);

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const authorMutation = useCreateOrUpdateAuthor(authorId, handleCancel);
  // ok
  const handleOk = () => {
    form
      .validateFields()
      .then((formValues) => {
        const formData = convertToFormData(formValues);

        authorMutation.mutate(formData);
      })
      .catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
      });
  };

  return (
    <Modal
      title={
        <h1 className="text-primary text-xl font-semibold pb-4 border-b border-gray-300">
          {authorId ? 'Sửa thông tin tác giả' : 'Nhập thông tin tác giả'}
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
        name={authorId ? "update-author-form" : "create-author-form"}
        initialValues={{
          name: '',
          biography: '',
          dob: null,
          nationality: '',
          awards: [],
          file: null,
        }}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label={
                <span>
                  Tên tác giả <span style={{ color: 'red' }}>*</span>
                </span>
              }
              rules={[{ required: true, message: 'Tên tác giả là bắt buộc.' }]}
            >
              <Input size="large" placeholder="Nhập tên tác giả" />
            </Form.Item>

            <Form.Item
              name="dob"
              label="Ngày sinh"
            >
              <DatePicker size="large" format="YYYY-MM-DD" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="nationality" label="Quốc tịch">
              <Select
                style={{ width: '100%' }}
                placeholder="Nhập hoặc chọn quốc tịch"
                options={countryOptions}
                showSearch
                optionFilterProp="label"
                size="large"
              />
            </Form.Item>

            <Form.Item name="awards" label="Giải thưởng">
              <Select
                open={false}
                mode="tags"
                size="large"
                placeholder="Giải thưởng"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="biography"
          label="Giới thiệu"
          rules={[{ type: 'string', message: 'Giới thiệu phải là một chuỗi.' }, { required: true, message: 'Giới thiệu về tác giả là bắt buộc.' }]}
        >
          <Input.TextArea size="large" rows={4} placeholder="Nhập giới thiệu" />
        </Form.Item>

        <Form.Item
          name="file"
          label="Ảnh tác giả"
          valuePropName="file"
          getValueFromEvent={(e) => e?.target?.files?.[0]}
        >
          <Input size="large" type="file" accept="image/*" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthorModal;
