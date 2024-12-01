import { useEffect, useRef, useState } from 'react';
import { delay, getUser } from '../lib/utils';
import { TUser } from '../type';
import Error from './Error';
import LoadingScreen from './LoadingScreen';
import ChatProvider from './ChatProvider';
import { socket } from '../lib/socket';
import ChatLayout from './ChatLayout';

export function Chat({ handleOpenConcent }: { handleOpenConcent: () => void }) {
  const [error, setError] = useState(false);
  const [hasSocketConnected, setHasSocketConneted] = useState(false);
  const [user, setUser] = useState<TUser | null>(null);

  const clientID = useRef('');

  useEffect(() => {
    getUser()
      .then(async (user) => {
        await delay(500);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      socket.io.opts.query = {
        username: user.username,
        uuid: user.uuid,
      };

      socket.connect();

      const handleConntect = () => {
        console.log('Conntect Client id = ' + socket.id);
        clientID.current = socket?.id ?? '';
        setHasSocketConneted(true);
      };

      const handleDisconnect = () => {
        console.log(socket.connected); // false
      };

     
      socket.on('connect', handleConntect);
      socket.on('disconnect', handleDisconnect);
      return () => {
        socket.off('connect', handleConntect);
        socket.off('disconnect', handleDisconnect);
      };
    }
  }, [user]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      {socket && hasSocketConnected && user ? (
        <ChatProvider setError={setError} user={user} socket={socket}>
          <ChatLayout handleOpenConcent={handleOpenConcent} />
        </ChatProvider>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
