import { formatNumber } from "../lib/utils";
import { useChat } from './ChatProvider';

export default function ChatHeader({
  handleOpenConcent,
}: {
  handleOpenConcent: () => void;
}) {
  const { handleShowActiveMembers, countMember } = useChat();

  return (
    <header className="sm:py-5 py-4 flex justify-between gap-5 items-center pr-4 px-4">
      <h1 className="max-sm:text-base font-semibold text-lg font-metal tracking-widest text-blue-400/90">
        HAuntD ChaT RoOM 
        <br />
      </h1>
      <button
        onClick={handleShowActiveMembers}
        className="hover:underline text-blue-400 font-bold"
      >
        <span className="font-faculty text-sm  tracking-widest">Active: {formatNumber(countMember)}</span>
      </button>
      <button
        className="text-xl active:scale-95 max-sm:text-lg"
        title="Caution"
        onClick={handleOpenConcent}
      >
        ⚠️
      </button>
    </header>
  );
}
