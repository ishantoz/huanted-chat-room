import { TMessage } from '../type';

export default function SenderMessageBubble({
  message,
}: {
  message: TMessage;
}) {
  return (
    <div className="flex justify-end">
      <div className="flex justify-end max-w-[85%] gap-2 group ">
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
        <div className="border-slate-700/30  text-neutral-200 pr-4 pl-4 py-3 rounded-l-3xl rounded-tr-3xl rounded-br-md backdrop-blur-md bg-slate-800/60 border ">
          <span className="break-words whitespace-pre-line max-w-full text-neutral-300">
            {message.value}
          </span>
        </div>
      </div>
    </div>
  );
}
