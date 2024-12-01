import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Socket } from 'socket.io-client';
import { TChatProvider, TMember, TUser } from '../type';

const ChatContext = createContext<TChatProvider>({} as TChatProvider);

export default function ChatProvider({
  socket,
  children,
  user,
}: {
  socket: Socket;
  user: TUser;
  setError: Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  const [activeMembers, setActiveMembers] = useState<{
    [key: string]: TMember;
  }>({});
  const [isMessageLoading, setMessagesLoading] = useState(true);
  const [showActiveMembers, setShowActiveMembers] = useState(false);
  const [messagesError, setMessageError] = useState(false);

  useEffect(() => {
    const handleJoin = (members: { [key: string]: TMember }) => {
      setActiveMembers(members);
    };

    socket.emit('act', socket.id);
    socket.on('join', handleJoin);

    return () => {
      socket.off('join', handleJoin);
    };
  }, [socket]);

  const handleShowActiveMembers = () => {
    setShowActiveMembers(!showActiveMembers);
  };

  const membersData = useMemo(() => {
    const members = Object.values(activeMembers).reverse();
    return {
      members,
      count: members.length,
    };
  }, [activeMembers]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        isMessageLoading,
        members: membersData.members,
        user,
        showActiveMembers,
        handleShowActiveMembers,
        setMessagesLoading,
        countMember: membersData.count,
        messagesError,
        setMessageError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useChat() {
  return useContext(ChatContext);
}
