import { memo } from 'react';
import { TMessage, TUser } from '../type';
import SenderMessageBubble from './SenderMessageBubble';
import ReciverMessageBubble from './ReciverMessageBubble';

export type MessageListProps = {
  messages: TMessage[];
  user: TUser;
};

const MessageList = memo(function MessageList(props: MessageListProps) {
  const { messages, user } = props;
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, i) =>
        message.uuid === user?.uuid ? (
          <SenderMessageBubble
            key={`message-${message.clientID}-${i}`}
            message={message}
          />
        ) : (
          <ReciverMessageBubble
            key={`message-${message.clientID}-${i}`}
            message={message}
          />
        )
      )}
    </div>
  );
});

export default MessageList;
