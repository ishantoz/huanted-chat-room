import { useChat } from './ChatProvider';

export default function ChatHeader({
  handleOpenConcent,
}: {
  handleOpenConcent: () => void;
}) {
  const { handleShowActiveMembers, countMember } = useChat();

  return (
    <header className="sm:py-4 py-3 flex justify-between gap-5 items-center pr-4 px-2">
      <h1 className="text-white max-sm:text-sm font-semibold text-xl">
        🎃 HAUNTED CHAT ROOM 👻
        <br />
      </h1>
      <button
        onClick={handleShowActiveMembers}
        className="hover:underline text-orange-500 font-bold"
      >
        <span>Active: {countMember}</span>
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
