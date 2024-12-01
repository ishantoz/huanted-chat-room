import { TMessage } from '../type';

export default function SenderMessageBubble({
  message,
}: {
  message: TMessage;
}) {
  return (
    <div className="flex justify-end">
      <div className="flex justify-end bg-orange-700 max-w-[85%] text-neutral-200 pr-4 pl-4 py-3 rounded-l-3xl rounded-tr-3xl rounded-br-md">
        <span className="break-words whitespace-pre-line max-w-full">
          {message.value}
        </span>
      </div>
    </div>
  );
}
