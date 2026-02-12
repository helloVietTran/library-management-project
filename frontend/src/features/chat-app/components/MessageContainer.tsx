import { useEffect, useRef } from 'react';
import { Avatar, Skeleton } from 'antd';
import MessageInput from './MessageInput';
import Message from './Message';
import { BsThreeDots } from 'react-icons/bs';
import { Conversation as ConversationType, Message as MessageType } from '@/interfaces/commom';

interface MessageContainerProps {
  conversation: ConversationType;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  isLoading: boolean;
}

const MessageContainer: React.FC<MessageContainerProps> = ({
  conversation,
  messages,
  setMessages,
  isLoading
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[450px]">
      <div className="flex items-center justify-between p-2 border-b border-gray-300">
        <div className='flex gap-2'>
          <Avatar src={false ? conversation.participants[0].avatar : "/img/default/default-avatar.png"} size={40} />
          <p className="flex items-center text-primary text-base font-semibold">
            {conversation.participants[0].fullName}
          </p>
        </div>

        <button
          className="
            size-7 flex items-center justify-center hover:bg-gray-200 rounded-sm shadow-sm transition-colors duration-300 cursor-pointer
          "
        >
          <BsThreeDots className="text-more-icon text-xl" />
        </button>
      </div>
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading
            ? [...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-2 p-2">
                <Skeleton.Avatar active shape="circle" />
                <div className="flex flex-col gap-2">
                  <Skeleton.Input active style={{ width: 250 }} />
                  <Skeleton.Input active style={{ width: 250 }} />
                </div>
              </div>
            ))
            : messages.map((msg, idx) => {
              const prevMsg = messages[idx - 1];

              return (
                <div key={msg._id} ref={idx === messages.length - 1 ? messageEndRef : null}>
                  <Message
                    message={msg}
                    conversation={conversation}
                    previousMessage={prevMsg}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <MessageInput setMessages={setMessages} conversation={conversation} />
    </div>
  );
};

export default MessageContainer;
