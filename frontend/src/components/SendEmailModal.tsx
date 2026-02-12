import React, { useState, useEffect } from 'react';
import { Modal, Select, Drawer, Button } from 'antd';

const { Option } = Select;

interface EmailTemplate {
  key: string;
  label: string;
  component: React.FC<any>;
}

interface SendEmailModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  emailTemplates: EmailTemplate[];
  templateProps: Record<string, any>;
  onOK: () => void;
}

const SendEmailModal: React.FC<SendEmailModalProps> = ({
  title = 'Gửi mail cho người dùng',
  open,
  onClose,
  emailTemplates,
  templateProps,
  onOK,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTemplateKey, setSelectedTemplateKey] = useState(
    emailTemplates[0]?.key || ''
  );

  useEffect(() => {
    if (emailTemplates.length > 0) {
      setSelectedTemplateKey(emailTemplates[0].key);
    }
  }, [emailTemplates]);

  const selectedTemplate = emailTemplates.find(
    (tpl) => tpl.key === selectedTemplateKey
  );

  return (
    <>
      <Modal
        title={
          <h1 className="text-xl text-primary pb-2 border-b border-gray-300 text-center font-semibold">
            {title}
          </h1>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        centered
      >
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-gay-600 font-medium mb-1">Từ</label>
            <Select
              size="large"
              defaultValue="numberzero0909@gmail.com"
              className="w-full"
            >
              <Option value="numberzero0909@gmail.com">
                numberzero0909@gmail.com
              </Option>
            </Select>
          </div>

          <div>
            <label className="text-gay-600 font-medium mb-1 flex gap-1">
              Mẫu Email<span className="text-red-500">*</span>
            </label>
            <Select
              size="large"
              value={selectedTemplateKey}
              className="w-full"
              onChange={(value) => setSelectedTemplateKey(value)}
            >
              {emailTemplates.map((tpl) => (
                <Option key={tpl.key} value={tpl.key}>
                  {tpl.label}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => setIsDrawerOpen(true)}
            >
              Xem trước
            </span>
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={onClose}>Hủy</Button>
            <Button type="primary" onClick={onOK}>
              Gửi
            </Button>
          </div>
        </div>
      </Modal>

      {/* Xem trước thông tin email */}
      <Drawer
        title="Xem trước email"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={500}
      >
        {selectedTemplate && <selectedTemplate.component {...templateProps} />}
      </Drawer>
    </>
  );
};

export default SendEmailModal;
