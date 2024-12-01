import { useRef, useState } from 'react';
import { ArrowOutline, SmileFaceSolid } from './icons';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { useChat } from './ChatProvider';
import { textareaAutoAdjustHeight } from '../lib/utils';
import { toast } from 'sonner';

export default function MessageForm() {
  const { socket } = useChat();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textInputField = useRef<HTMLTextAreaElement | null>(null);

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    if (!textInputField.current) {
      return;
    }
    textInputField.current.value += emojiObject.emoji;
    textInputField.current.focus();
    socket.emit('typing', textInputField.current.value);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (!textInputField.current) {
      return;
    }

    const messageValue = textInputField.current.value.trim();
    const lengthCond = messageValue.length <= 500;

    if (messageValue !== '' && lengthCond) {
      socket.emit('chat message', {
        value: textInputField.current.value,
        clientID: socket.id,
      });
      textInputField.current.style.height = 'auto';
      textInputField.current.value = '';
    }
    if (!lengthCond) {
      toast.warning('👻 Message Too Long!', {
        description: '🧟‍♂️ Keep your spectral message under 500 characters.',
        style: {
          background: '#1f1f1f',
          border: '1px solid #ff6b00',
          color: '#ffffff',
          fontSize: '1rem',
        },
        duration: 3000,
      });
    }
  };

  return (
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
          className="flex-1 focus:ring-offset-2 ring-orange-500 outline-0 focus:ring-2 py-2.5 pl-3 rounded-md focus:ring-offset-gray-900 border-slate-700/70 border bg-slate-900 text-white max-sm:text-sm resize-none placeholder:select-none placeholder:text-neutral-500 w-full custom-style-scroll custom-text-area-style-scroll"
          ref={textInputField}
          rows={1}
          autoComplete="off"
          placeholder="Type a spooky message..."
          onBlur={() => {
            socket.emit('typingCancel', '');
          }}
          onInput={(e) => {
            const field = e.currentTarget;
            if (field instanceof HTMLTextAreaElement) {
              socket.emit('typing', field.value);
              textareaAutoAdjustHeight(field);
            }
          }}
          onKeyDown={(e) => {
            if (!e.shiftKey && e.key === 'Enter') {
              e.preventDefault();
              const field = e.currentTarget;
              if (field instanceof HTMLTextAreaElement) {
                handleSendMessage();
              }
            }
          }}
        ></textarea>
      </div>
      <button
        type="submit"
        className="flex rounded-xl bg-primary p-[0.25rem] text-primary-foreground transition active:scale-[0.9] active:bg-primary-dark items-center mb-1 bg-orange-500 text-black mr-3"
      >
        <span className="sm:h-7 sm:w-7 h-6 w-6">
          <ArrowOutline />
        </span>
      </button>
    </form>
  );
}
