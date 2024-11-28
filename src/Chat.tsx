import { useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { textareaAutoAdjustHeight } from './lib/utils';
import { ArrowOutline, SmileFaceSolid } from './components/icons';
import ActiveMembers, { TMemember } from './ActiveMembers';
import DisplayTime from './components/DisplayTime';

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

const persistenceMsgLimit = 1500;

const storedMessages = localStorage.getItem('messages')
  ? (JSON.parse(localStorage.getItem('messages') ?? '') as TMessage[])
  : [];
let socket: Socket;

export function Chat({ handleOpenConcent }: { handleOpenConcent: () => void }) {
  const [messages, setMessages] = useState<TMessage[]>(storedMessages);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showActiveMembers, setShowActiveMembers] = useState(false);

  //
  const [typingMessages, setTypingMessage] = useState<{
    [key: string]: TMessageTyping;
  }>({});

  const [activeMembers, setActiveMembers] = useState<{
    [key: string]: TMemember;
  }>({});

  const messagesBox = useRef<HTMLDivElement | null>(null);

  const clientID = useRef('');

  const handleShowActiveMembers = () => {
    setShowActiveMembers(!showActiveMembers);
  };

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
      if (e.target instanceof HTMLTextAreaElement) {
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
        // Add the new message to the end of the array
        const newMessages = [...prevMessages, message];

        // Check if truncation is needed
        const limitedMessages =
          newMessages.length > persistenceMsgLimit
            ? newMessages.slice(-1 * persistenceMsgLimit)
            : newMessages;

        // Save the updated array to localStorage
        window.localStorage.setItem(
          'messages',
          JSON.stringify(limitedMessages)
        );

        // Update the state with the truncated array (if applicable)
        return limitedMessages;
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

    const handleJoin = (members: { [key: string]: TMemember }) => {
      setActiveMembers(members);
    };

    socket.on('join', handleJoin);

    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('chat message', handleMessage);
      socket.off('typing', handleTyping);
      socket.off('connect', handleConntect);
      socket.off('disconnect', handleDisconnect);
      socket.off('join', handleJoin);
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

  const handleSendMessage = () => {
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
  const members = Object.values(activeMembers).reverse();

  const messageItem = useMemo(() => {
    return messages.map((message, i) =>
      message.uuid === getUUID() ? (
        <div
          className="flex justify-end"
          key={`message-${message.clientID}-${i}`}
        >
          <div className="flex justify-end bg-slate-900 border-slate-700/40 border max-w-[85%] text-neutral-100 pr-4 pl-5 py-3 rounded-l-3xl rounded-br-3xl rounded-tr-md">
            <span className="break-words whitespace-pre-line w-full">
              {message.value}
            </span>
          </div>
        </div>
      ) : (
        <div key={`message-${message.clientID}-${i}`} className="relative mb-4">
          <div className="max-w-[85%]">
            <div className="flex flex-col bg-slate-950 border border-slate-700/50 pl-4 pr-8 py-3 gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-md">
              <span className="font-bold text-sm uppercase  text-orange-600">
                {message.username}
              </span>
              <span className="break-words whitespace-pre-line text-neutral-300">
                {message.value}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-5 left-0">
            <DisplayTime time={message.time} />
          </div>
        </div>
      )
    );
  }, [messages]);

  return (
    <div className="h-screen flex pt-5 justify-center">
      <div className="h-[90%] border flex flex-col px-2 rounded-xl max-w-xl mx-auto overflow-hidden border-slate-800/80 bg-gray-950 w-full relative">
        <header className="bg-slate-950 sm:py-4 px-3 py-3 flex justify-between gap-5 items-center">
          <h1 className="text-white max-sm:text-sm font-semibold text-xl">
            🎃 HAUNTED CHAT ROOM 👻
            <br />
          </h1>
          <button
            onClick={handleShowActiveMembers}
            className="hover:underline text-orange-500 font-bold"
          >
            <span>Active: {members.length}</span>
          </button>
          <button
            className="text-xl active:scale-95 max-sm:text-lg"
            title="Caution"
            onClick={handleOpenConcent}
          >
            ⚠️
          </button>
        </header>
        <ActiveMembers
          members={members}
          show={showActiveMembers}
          handleShowActiveMembers={handleShowActiveMembers}
          uuid={getUUID()}
        />
        <div
          ref={messagesBox}
          className="flex-1 bg-[#0a0d1a] to-slate-900/40 p-4 overflow-x-hidden flex flex-col gap-4 rounded-xl"
        >
          {messageTypingsList.length < 1 && messages.length < 1 ? (
            <div className="text-orange-500">
              <h1 className="text-2xl font-bold">BOO! 👻</h1>
              <p>The spirits are quiet... Send a message to summon them!</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4">{messageItem}</div>
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
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full sm:py-4 py-3  border-orange-300 gap-2 items-end"
        >
          <div className="relative flex items-center">
            <div>
              <button
                data-emoji-picker-toggle
                type="button"
                className="flex text-orange-500  active:scale-95 px-1 py-2.5"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <span className="w-6 h-6">
                  <SmileFaceSolid />
                </span>
              </button>
            </div>

            {showEmojiPicker && (
              <div className="absolute left-0 bottom-16 right-4">
                <EmojiPicker
                  emojiStyle={EmojiStyle.NATIVE}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
          </div>

          <div className="w-full flex items-end">
            <textarea
              className="flex-1 focus:ring-offset-2 ring-orange-500 outline-0 focus:ring-2 py-2.5 pl-3 rounded-md focus:ring-offset-gray-900 border-slate-700/70 border bg-slate-900 text-white max-sm:text-sm resize-none placeholder:select-none placeholder:text-neutral-500 w-full "
              id="input"
              rows={1}
              autoComplete="off"
              placeholder="Type a spooky message..."
              onInput={(e) => {
                const field = e.currentTarget;
                if (field instanceof HTMLTextAreaElement) {
                  textareaAutoAdjustHeight(field);
                }
              }}
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === 'Enter') {
                  e.preventDefault();
                  const field = e.currentTarget;
                  if (field instanceof HTMLTextAreaElement) {
                    field.style.height = 'auto';
                    handleSendMessage();
                  }
                }
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="flex rounded-xl bg-primary p-[0.25rem] text-primary-foreground transition active:scale-[0.9] active:bg-primary-dark items-center mb-1 bg-orange-500 text-black"
          >
            <span className="sm:h-7 sm:w-7 h-6 w-6">
              <ArrowOutline />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
