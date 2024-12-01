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
        <div className="max-w-full flex flex-col bg-slate-900 border border-slate-700/40 pl-4 pr-5 py-3 gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-md">
          <span className="font-bold text-sm uppercase font-matal tracking-widest text-orange-600">
            {message.username}
          </span>
          <span className="break-words whitespace-pre-line text-neutral-300">
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
