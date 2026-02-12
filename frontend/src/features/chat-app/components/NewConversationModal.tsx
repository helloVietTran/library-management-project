import React, { useState } from 'react';
import { Modal, Select, Spin, message } from 'antd';
import debounce from 'lodash/debounce';

import api from '@/config/axios';
import { PaginatedResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';
import useCreateConversation from '../hooks/useCreateConversations';

interface NewConversationModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewConversationModal: React.FC<NewConversationModalProps> = ({
    isModalOpen,
    setIsModalOpen,
}) => {
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);
    const [userOptions, setUserOptions] = useState<{ label: string; value: string; userId: string }[]>([]);

    const createConversationMutation = useCreateConversation();

    const handleOk = () => {
        const selected = userOptions.find((u) => u.value === selectedUser);
        if (!selected) {
            message.warning('Vui lòng chọn người dùng để bắt đầu cuộc trò chuyện.');
            return;
        }
        createConversationMutation.mutate({ recipientId: selected.userId });
      
        setIsModalOpen(false);
        setSelectedUser(undefined);
        setUserOptions([]);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUser(undefined);
        setUserOptions([]);
    };

    const fetchUserSuggestions = debounce(async (searchText: string) => {
        setLoading(true);
        try {
            const res = await api.get<PaginatedResponse<User>>('/users', {
                params: { search: searchText },
            });
            const options = res.data.data.map((user: User) => ({
                label: user.fullName,
                value: user.fullName,
                userId: user._id,
            }));
            setUserOptions(options);
        } catch (err) {
            console.error('Lỗi khi tìm người dùng:', err);
        } finally {
            setLoading(false);
        }
    }, 300);

    return (
        <Modal
            title="Tạo cuộc trò chuyện mới"
            open={isModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
            okText="Tạo"
        >
            <Select
                showSearch
                placeholder="Nhập tên người dùng"
                style={{ width: '100%' }}
                onSearch={fetchUserSuggestions}
                onChange={(value) => setSelectedUser(value)}
                value={selectedUser}
                filterOption={false}
                size='large'
                notFoundContent={loading ? <Spin size="small" /> : null}
                options={userOptions.map((u) => ({
                    label: u.label,
                    value: u.value,
                }))}
            />
        </Modal>
    );
};

export default NewConversationModal;
