import React, { useEffect, useRef } from 'react';

interface CautionModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasConcent: boolean;
}

const CautionModal: React.FC<CautionModalProps> = ({
  isOpen,
  onClose,
  hasConcent,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 sm:p-6 md:p-8 z-[99990]">
      <div
        ref={modalRef}
        className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg w-full max-w-2xl shadow-md  max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <h2
          id="modal-title"
          className="text-3xl font-metal tracking-wider font-bold text-blue-500 mb-6 flex items-center"
        >
          <span className="mr-2">⚠️</span> Caution{' '}
          <span className="ml-2">👻</span>
        </h2>
        <div className="text-gray-300 space-y-10 pr-2 ">
          <p className="">
            Welcome, brave soul, to the Haunted Chat Room! Before you venture
            further into this spooky realm, please be aware of the following:
          </p>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              This chat room is for{' '}
              <span className="text-blue-500 font-semibold">
                entertainment and development purposes only
              </span>
              . It's not intended for personal or production use.
            </li>
            <li>
              By entering, you acknowledge that you're using this application{' '}
              <span className="text-blue-500 font-semibold">
                at your own risk
              </span>
              . The developers are not responsible for any haunting experiences
              or digital poltergeists you may encounter.
            </li>
            <li>
              <span className="text-blue-500 font-semibold">
                Do not share personal information
              </span>{' '}
              or sensitive data. Remember, ghosts are notorious gossips!
            </li>
            <li>
              Messages sent here are not encrypted and may be visible to others.
              Treat this chat as you would a conversation in a crowded, haunted
              house.
            </li>
            <li>
              We reserve the right to terminate your session if you engage in
              inappropriate behavior or attempt to summon malevolent spirits.
            </li>
          </ol>
          <p>
            By clicking "I Dare to Enter," you agree to these terms and
            conditions. If you do not agree, please close this window and return
            to the safety of the mortal realm.
          </p>
        </div>
        <div className="flex justify-end mt-6 sticky bottom-0 pt-4 ">
          {hasConcent ? (
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Close
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              I Dare to Enter 🎃
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CautionModal;
