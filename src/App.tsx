import { useState } from 'react';
import CautionModal from './CautionModal';
import { Chat } from './Chat';

export default function App() {
  const [hasConcent, setConcent] = useState(
    window.localStorage.getItem('ca') ? true : false
  );

  const [openConcent, setOpenConcent] = useState(
    !window.localStorage.getItem('ca') ? true : false
  );

  const handleCautionClose = () => {
    if (!window.localStorage.getItem('ca')) {
      window.localStorage.setItem('ca', '1');
      setConcent(true);
    }
    setOpenConcent(false);
  };

  const handleOpenConcent = () => {
    setOpenConcent(true);
  };

  return (
    <>
      <CautionModal hasConcent={hasConcent} isOpen={openConcent} onClose={handleCautionClose} />

      {hasConcent && <Chat handleOpenConcent={handleOpenConcent} />}
    </>
  );
}
