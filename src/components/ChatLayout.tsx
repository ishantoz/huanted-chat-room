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
      <div className="h-[95%] border flex flex-col pl-2 rounded-xl max-w-xl mx-auto overflow-hidden border-slate-800/80 bg-[#0a0d1a] w-full relative">
        <ChatHeader handleOpenConcent={handleOpenConcent} />
        <ActiveMembers />
        <MessagesBox />
        <MessageForm />
      </div>
    </div>
  );
}
