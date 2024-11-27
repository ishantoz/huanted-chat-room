import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

const getUsername = () => {
  let username: string | null;

  do {
    username =
      window.localStorage.getItem('username') ||
      window.prompt('Enter your name:');
    if (username) {
      window.localStorage.setItem('username', username);
    }
  } while (!username);

  return username;
};

const getUUID = () => {
  let uuid = window.localStorage.getItem('uuid');
  if (!uuid) {
    uuid = crypto.randomUUID();
    window.localStorage.setItem('uuid', uuid);
  }
  return uuid;
};

type TMessage = {
  clientID: string;
  value: string;
  time: string;
  uuid: string;
  username: string;
};

type TMessageTyping = {
  clientID: string;
  value: string;
  uuid: string;
  username: string;
  type: 'remove' | 'typing';
};

const storedMessages = localStorage.getItem('messages')
  ? (JSON.parse(localStorage.getItem('messages') ?? '') as TMessage[])
  : [];
let socket: Socket;
export function Chat({ handleOpenConcent }: { handleOpenConcent: () => void }) {
  const [messages, setMessages] = useState<TMessage[]>(storedMessages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  //
  const [typingMessages, setTypingMessage] = useState<{
    [key: string]: TMessageTyping;
  }>({});

  const messagesBox = useRef<HTMLDivElement | null>(null);

  const clientID = useRef('');

  useEffect(() => {
    const username = getUsername();

    socket = io(import.meta.env.VITE_WS_URL ?? 'https://uqify.com', {
      autoConnect: false,
      query: {
        username,
        uuid: getUUID(),
      },
    });

    socket.connect();
    // client-side

    const handleConntect = () => {
      console.log('Conntect Client id = ' + socket.id);
      clientID.current = socket?.id ?? '';
    };

    socket.on('connect', handleConntect);

    const form = document.getElementById('form');
    const input = document.getElementById('input') as HTMLInputElement;

    const handleChange = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        socket.emit('typing', e.target.value);
      }
    };

    const handleSendMessage = (e: SubmitEvent) => {
      e.preventDefault();
      if (input && input?.value) {
        socket.emit('chat message', {
          value: input.value,
          clientID: socket.id,
        });
        input.value = '';
      }
    };

    const handleMessage = (message: TMessage) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, message];
        window.localStorage.setItem('messages', JSON.stringify(newMessages));
        return newMessages;
      });
    };
    socket.on('chat message', handleMessage);

    input?.addEventListener('input', handleChange);

    const handleTyping = (typingMessage: TMessageTyping) => {
      if (typingMessage.type === 'typing' && typingMessage.uuid !== getUUID()) {
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
          }, 2000);
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

    const handleInputBlur = () => {
      socket.emit('typingCancel', '');
    };
    input?.addEventListener('blur', handleInputBlur);

    socket.on('typing', handleTyping);

    form?.addEventListener('submit', handleSendMessage);

    const handleDisconnect = () => {
      console.log(socket.connected); // false
    };

    socket.on('disconnect', handleDisconnect);
    return () => {
      socket.off('chat message', handleMessage);
      socket.off('typing', handleTyping);
      socket.off('connect', handleConntect);
      socket.off('disconnect', handleDisconnect);

      form?.removeEventListener('submit', handleSendMessage);
      input?.removeEventListener('input', handleChange);
      input?.removeEventListener('blur', handleInputBlur);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [typingMessages]);

  useEffect(() => {
    if (messagesBox.current) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = document.getElementById('input') as HTMLInputElement;
    if (input && input.value) {
      socket.emit('chat message', {
        value: input.value,
        clientID: socket.id,
      });
      input.value = '';
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    const input = document.getElementById('input') as HTMLInputElement;
    if (input) {
      input.value += emojiObject.emoji;
      input.focus();
      socket.emit('typing', input.value);
    }
    setShowEmojiPicker(false);
  };

  const messageTypingsList = Object.values(typingMessages);
  return (
    <div className="h-screen flex pt-5 justify-center">
      <div className="h-[90%] flex flex-col px-2 rounded-xl max-w-xl mx-auto overflow-hidden border-orange-200/10 bg-gray-950 w-full">
        <header className="bg-slate-950 sm:py-4 px-3 py-3 rounded-t-md flex justify-between gap-5 items-center">
          <h1 className="text-white max-sm:text-sm font-semibold text-xl">
            🎃 HAUNTED CHAT ROOM 👻
          </h1>
          <button
            className="text-xl active:scale-95 max-sm:text-lg"
            title="Caution"
            onClick={handleOpenConcent}
          >
            ⚠️
          </button>
        </header>
        <div
          ref={messagesBox}
          className="flex-1 bg-[#0a0d1a] p-4 overflow-x-hidden flex flex-col gap-4 rounded-lg"
        >
          {messageTypingsList.length < 1 && messages.length < 1 ? (
            <div className="text-orange-500">
              <h1 className="text-2xl font-bold">BOO! 👻</h1>
              <p>The spirits are quiet... Send a message to summon them!</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {messages.map((message, i) =>
                  message.uuid === getUUID() ? (
                    <div
                      className="flex justify-end"
                      key={`message-${message.clientID}-${i}`}
                    >
                      <div className="flex justify-end bg-orange-700  max-w-[85%] text-neutral-100 pr-4 pl-5 py-3 rounded-l-3xl rounded-br-3xl rounded-tr-md">
                        <span className="break-words font-light whitespace-pre-line ">
                          {message.value}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={`message-${message.clientID}-${i}`}>
                      <div className="max-w-[85%] flex">
                        <div className="flex flex-col bg-slate-950 border border-orange-600/20 pl-4 pr-8 py-3 gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-md">
                          <span className="font-bold text-sm uppercase  text-orange-600">
                            {message.username}
                          </span>
                          <span className="break-words whitespace-pre-line  text-neutral-300">
                            {message.value}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] pl-2 text-neutral-400 ">
                        {' '}
                        {format(message.time, 'eee, MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col gap-4">
                {messageTypingsList.map((typingMessage, i) => (
                  <div key={`typing_message-${typingMessage.clientID}-${i}`}>
                    <div className="max-w-[85%] flex">
                      <div className="flex flex-col bg-slate-950 pl-4 pr-8 py-3 gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-md">
                        <span className="font-bold text-sm uppercase text-red-500">
                          {typingMessage.username} IS TYPING...
                        </span>
                        <span className="break-words  whitespace-pre-line text-white">
                          {typingMessage.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <form
          id="form"
          onSubmit={handleSendMessage}
          className="flex w-full sm:py-4 py-3  border-orange-300 gap-2"
        >
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className=" text-white sm:text-3xl p-2 rounded-full border-orange-500/30 text-xl border active:border-orange-500/60"
            >
              👿
            </button>
            {showEmojiPicker && (
              <div className="absolute left-0 bottom-16 right-4">
                <EmojiPicker
                  emojiStyle={EmojiStyle.NATIVE}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
          </div>

          <div className="flex flex-1">
          <input
            className="flex-1 w-full ring-orange-500  outline-0 focus:ring-2 px-3 rounded-l-md  border-orange-500/30 border bg-[#0a0d1a] text-white max-sm:text-sm"
            id="input"
            autoComplete="off"
            placeholder="Type a spooky message..."
          />

          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-3 active:bg-orange-700 transition-colors font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 max-sm:px-2 max-sm:text-sm focus:ring-offset-gray-900 rounded-r-md"
          >
            Haunt
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
