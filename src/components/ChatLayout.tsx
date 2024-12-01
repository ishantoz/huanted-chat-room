import MessageForm from './MessageForm';
import ActiveMembers from './ActiveMembers';
import { MessagesBox } from './MessageBox';
import ChatHeader from './ChatHeader';

export default function ChatLayout({
  handleOpenConcent,
}: {
  handleOpenConcent: () => void;
}) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative sm:h-[95%] h-full max-w-xl w-full z-[1000]">
        <div className="h-full w-full sm:border flex flex-col pl-2 rounded-xl mx-auto overflow-hidden bg-slate-900/10 border-slate-800/60  relative max-w-xl">
          <ChatHeader handleOpenConcent={handleOpenConcent} />
          <ActiveMembers />
          <MessagesBox />
          <MessageForm />
        </div>
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-[#0a0d1a] rounded-xl pointer-events-none z-[-1]">
          <span className="absolute top-[0] left-[40%] max-sm:text-[4.5rem] text-[6rem] opacity-[0.11] rotate-6">👻</span>
          <span className="absolute top-[20%] right-[5%] max-sm:text-[2.5rem] text-[4rem] opacity-[0.11]">☠️</span>
          <span className="absolute top-[10%] left-[5%] max-sm:text-[2.5rem] text-[4rem] opacity-[0.11]">🪦</span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:text-[4.5rem] text-[8rem] opacity-[0.11]">🎃</span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:text-[4.5rem] mt-[10rem] rotate-45 ml-[-10rem] text-[6rem] opacity-[0.11]">🎃</span>
          <span className="absolute top-[30%] left-[4%] max-sm:text-[4rem] text-[6rem] opacity-[0.11]">🕸️</span>
          <span className="absolute bottom-[0] left-[2%] max-sm:text-[4rem] text-[6rem] opacity-[0.11]">👻</span>
          <span className="absolute bottom-[0] right-[2%] max-sm:text-[4rem] text-[6rem] opacity-[0.11]">🎃</span>
          <span className="absolute top-[20%] right-1/2 max-sm:text-[4.5rem] text-[5rem] opacity-[0.11]">🧛</span>
          <span className="absolute top-[60%] right-[5%] max-sm:text-[3.5rem] text-[5rem] opacity-[0.11]">🧟</span>
        </div>
      </div>
    </div>
  );
}
