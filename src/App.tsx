import { useState } from 'react';
import CautionModal from './components/CautionModal';
import { Chat } from './components/Chat';
import { Toaster } from 'sonner';
import BG from "./components/bg";

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
      <CautionModal
        hasConcent={hasConcent}
        isOpen={openConcent}
        onClose={handleCautionClose}
      />
      {hasConcent && <Chat handleOpenConcent={handleOpenConcent} />}
      <Toaster
        expand
        richColors
        position="top-center"
        
      />
      <BG />
    </>
  );
}
