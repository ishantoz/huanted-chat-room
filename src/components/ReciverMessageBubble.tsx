import { TMessage } from '../type';
import DisplayTime from "./DisplayTime";

export default function ReciverMessageBubble({
  message,
}: {
  message: TMessage;
}) {
  return (
    <div className="relative mb-4">
      <div className="max-w-[85%] flex ">
        <div className="max-w-full flex flex-col bg-slate-900 backdrop-blur-sm border border-slate-700/20 pl-4 pr-5 py-3 gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-md">
          <span className="font-bold text-sm uppercase font-metal tracking-widest text-blue-500">
            {message.username}
          </span>
          <span className="break-words text-blue-100/85 whitespace-pre-line ">
            {message.value}
          </span>
        </div>
      </div>
      <div className="absolute -bottom-5 left-0">
        <DisplayTime prefix="Sent" time={message.time} />
      </div>
    </div>
  );
}
