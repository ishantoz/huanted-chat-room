import { useChat } from './ChatProvider';

export default function ChatHeader({
  handleOpenConcent,
}: {
  handleOpenConcent: () => void;
}) {
  const { handleShowActiveMembers, countMember } = useChat();

  return (
    <header className="sm:py-5 py-4 flex justify-between gap-5 items-center pr-4 px-4">
      <h1 className="max-sm:text-base font-semibold text-xl font-metal tracking-widest ">
        HAUNTED CHAT ROOM 
        <br />
      </h1>
      <button
        onClick={handleShowActiveMembers}
        className="hover:underline text-orange-500 font-bold"
      >
        <span className="font-metal tracking-widest">Active: {countMember}</span>
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
