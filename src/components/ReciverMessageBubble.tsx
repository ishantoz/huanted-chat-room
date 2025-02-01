import { TMessage } from '../type';
import DisplayTime from './DisplayTime';

export default function ReciverMessageBubble({
  message,
}: {
  message: TMessage;
}) {
  return (
    <div className="relative mb-4">
      <div className="max-w-[85%] flex group">
        <div className="flex max-w-full gap-2">
          <div className="flex flex-col bg-slate-900 backdrop-blur-sm border border-slate-700/20 pl-4 pr-5 py-3 gap-1 rounded-r-3xl rounded-bl-3xl rounded-tl-md">
            <span className="font-bold text-xs uppercase tracking-widest text-blue-400">
              {message.username}
            </span>
            <span className="break-words text-blue-100/85 whitespace-pre-line ">
              {message.value}
            </span>
          </div>
          <button className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-200 ease-in-out transform delay-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="size-4 text-slate-400"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
        <div className="absolute font-sans -bottom-5 left-0">
        <DisplayTime prefix="Sent" time={message.time} />
      </div>
      </div>
    </div>
  );
}
