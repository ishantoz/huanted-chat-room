import { TMessageTyping } from '../type';

type TypingMessageListProps = {
  typingMessages: TMessageTyping[];
};

export default function TypingMessageList(props: TypingMessageListProps) {
  const { typingMessages } = props;
  return (
    <div className="flex flex-col gap-4">
      {typingMessages.map((typingMessage, i) => (
        <div
          key={`typing_message-${typingMessage.clientID}-${i}`}
          className="relative mb-4"
        >
          <div className="max-w-[85%] flex ">
            <div className="max-w-full flex flex-col bg-slate-900 pl-4 pr-5 rounded-r-3xl rounded-bl-3xl rounded-tl-md py-4">
              <div className="flex">
                <span className="font-bold text-sm uppercase text-orange-500 flex items-center ">
                  {typingMessage.username} is typing
                  <span className="flex gap-1 mt-[0.7rem] ml-[2.5px]">
                    <span className="w-1 h-1 rounded-full bg-orange-600 animate-[typing_1s_ease-in-out_infinite]"></span>
                    <span className="w-1 h-1 rounded-full bg-orange-500 animate-[typing_1s_ease-in-out_0.2s_infinite]"></span>
                    <span className="w-1 h-1 rounded-full bg-orange-400 animate-[typing_1s_ease-in-out_0.4s_infinite]"></span>
                  </span>
                </span>
              </div>
              <span className="break-words whitespace-pre-line text-neutral-300">
                {typingMessage.value}
                <span className="inline-block ml-[1px] font-normal text-[1.2em] animate-[cursor_0.7s_infinite] text-neutral-300">
                  |
                </span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
