import { TMessage } from '../type';

export default function SenderMessageBubble({
  message,
}: {
  message: TMessage;
}) {
  return (
    <div className="flex justify-end">
      <div className="flex justify-end border border-slate-700/30 max-w-[85%] text-neutral-200 pr-4 pl-4 py-3 rounded-l-3xl rounded-tr-3xl rounded-br-md backdrop-blur-md bg-slate-800/60">
        <span className="break-words whitespace-pre-line max-w-full text-neutral-300">
          {message.value}
        </span>
      </div>
    </div>
  );
}
