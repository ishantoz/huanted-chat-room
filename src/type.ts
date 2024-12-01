import { Socket } from 'socket.io-client';

export type TMember = {
  username: string;
  uuid: string;
  avatar?: string;
  joined_at: string;
};

export type TMessage = {
  clientID: string;
  value: string;
  time: string;
  uuid: string;
  username: string;
};

export type TUser = {
  username: string;
  uuid: string;
  avatar?: string;
};

export type TMessageTyping = {
  clientID: string;
  value: string;
  uuid: string;
  username: string;
  type: 'remove' | 'typing';
};

export type TChatProvider = {
  socket: Socket;
  members: TMember[];
  user: TUser;
  countMember: number;
  showActiveMembers: boolean;
  isMessageLoading: boolean;
  setMessagesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  messagesError: boolean;
  setMessageError: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowActiveMembers: () => void;
};
