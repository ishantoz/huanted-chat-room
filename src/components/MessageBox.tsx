import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import MessageList from './MessageList';
import EmptyAlert from './EmptyAlert';
import TypingMessageList from './TypingMessageList';
import { TMessage, TMessageTyping } from '../type';
import { useChat } from './ChatProvider';
import localforage from 'localforage';
import { delay } from '../lib/utils';
import MessageBoxError from './MessageBoxError';
import MessageLoadingScreen from './MessageLoadingScreen';
import { useChatScrollToBottomOnUpdate, useSmoothScroll } from '../hooks/use-scroll';

const persistenceMsgLimit = 1500;

export function MessagesBox() {
  const {
    user,
    socket,
    isMessageLoading,
    setMessagesLoading,
    messagesError,
    setMessageError,
  } = useChat();
  const [messagesBox, smoothScrollToBottom] = useSmoothScroll<HTMLDivElement>();
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [typingMessagesList, setTypingMessage] = useState<{
    [key: string]: TMessageTyping;
  }>({});

  const [hasMessageLoaded, setHasMessageLoaded] = useState(false);

  useEffect(() => {
    const handleFetchMessage = async () => {
      try {
        const messagesValue = await localforage.getItem('messages');
        await delay(500);
        setMessages((messagesValue ?? []) as TMessage[]);
      } catch (err) {
        console.log(err);
        setMessageError(true);
      } finally {
        setMessagesLoading(false);
      }
    };
    handleFetchMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleMessage = (message: TMessage) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];

        const limitedMessages =
          newMessages.length > persistenceMsgLimit
            ? newMessages.slice(-1 * persistenceMsgLimit)
            : newMessages;

        localforage.setItem('messages', limitedMessages);

        return limitedMessages;
      });
    };

    const handleTyping = (typingMessage: TMessageTyping) => {
      if (typingMessage.type === 'typing' && typingMessage.uuid !== user.uuid) {
        setTypingMessage((preTypingMessages) => ({
          ...preTypingMessages,
          [typingMessage.clientID]: typingMessage,
        }));

        if (typingMessage.value === '') {
          setTimeout(() => {
            setTypingMessage((preTypingMessages) => {
              delete preTypingMessages[typingMessage.clientID];
              return {
                ...preTypingMessages,
              };
            });
          }, 3000);
        }
      } else {
        setTypingMessage((preTypingMessages) => {
          delete preTypingMessages[typingMessage.clientID];
          return {
            ...preTypingMessages,
          };
        });
      }
    };
    socket.on('typing', handleTyping);
    socket.on('chat message', handleMessage);
    return () => {
      socket.off('typing', handleTyping);
      socket.off('chat message', handleMessage);
    };
  }, [socket, user.uuid]);

  const typingMessages = useMemo(() => {
    return Object.values(typingMessagesList);
  }, [typingMessagesList]);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messagesBox, typingMessagesList]);

  useLayoutEffect(() => {
    if (messagesBox.current && !hasMessageLoaded) {
      setHasMessageLoaded(true);
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [hasMessageLoaded, messages, messagesBox]);

  useChatScrollToBottomOnUpdate(messagesBox, [messages], smoothScrollToBottom);

  useChatScrollToBottomOnUpdate(messagesBox, [messages, typingMessages], smoothScrollToBottom);
  

  if (messagesError) {
    return <MessageBoxError />;
  }

  if (isMessageLoading) {
    return <MessageLoadingScreen />;
  }

  return (
    <div
      ref={messagesBox}
      className="flex-1 p-4 overflow-x-hidden custom-style-scroll flex flex-col gap-4 rounded-xl overflow-y-scroll"
    >
      {typingMessages.length < 1 && messages.length < 1 ? (
        <EmptyAlert />
      ) : (
        <>
          <MessageList messages={messages} user={user} />
          <TypingMessageList typingMessages={typingMessages} />
        </>
      )}
    </div>
  );
}
