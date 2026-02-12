import { Input } from 'antd';
import { useState } from 'react';

import { AiOutlineSend } from "react-icons/ai";
import { Message as MessageType, Conversation as ConversationType } from '@/interfaces/commom';
import useAuthStore from '@/store/authStore';
import useSendMessage from '../hooks/useSendMessage';
import { getSocket } from '@/config/socket';
import { getTokenFromSession } from '@/utils/auth';

interface MessageInputProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  conversation: ConversationType
}

const MessageInput: React.FC<MessageInputProps> = ({
  setMessages,
  conversation
}) => {
  const { user: currentUser } = useAuthStore();

  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const sendMessage = useSendMessage();

  const handleSendMessage = async () => {
    if (!messageText) return;
    if (isSending) return;
    setIsSending(true);

    const tempMessage: MessageType = {
      _id: `temp-${Date.now()}`,
      text: messageText,
      sender: currentUser?._id || '',
      seen: false,
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await sendMessage.mutateAsync({
        recipientId: conversation.participants[0]._id,
        message: messageText,
      });

      setMessages((prev) =>
        prev.map((m) => (m._id === tempMessage._id ? res.data : m))
      );

      const token = getTokenFromSession();
      if (!token) return;

      const socket = getSocket(token);
      socket.emit('markMessagesAsSeen', {
        conversationId: conversation._id,
        userId: currentUser?._id,
      });

    } catch {

      setMessages((prev) => prev.filter((m) => m._id !== tempMessage._id));
    } finally {
      setMessageText('');
      setIsSending(false);
    }
  };
  return (
    <div className="flex items-center gap-2 p-2 pt-3 border-t border-gray-200">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex-1"
      >
        <Input
          placeholder="Nhập tin nhắn"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          suffix={
            <AiOutlineSend
              onClick={handleSendMessage}
              className="cursor-pointer text-primary"
              size={22}
            />
          }
          size="large"
          style={{ borderRadius: '20px' }}
          className="shadow-xs"
        />
      </form>

    </div>
  );
};

export default MessageInput;
