import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { memo, useLayoutEffect } from 'react';

const EmojiPickerMemo = memo(function EmojiPickerMemo({
  handleEmojiClick,
}: {
  handleEmojiClick: (emojiObject: { emoji: string }) => void;
}) {
  useLayoutEffect(() => {
    const emojiBody = document.querySelector('.epr-body');
    if (emojiBody) {
      emojiBody.classList.add('custom-emoji-style-scroll');
    }
  }, []);
  return (
    <div className="absolute left-0 bottom-16 right-4 [&_.epr-main]:bg-gray-900/50 [&_.epr-main]:border [&_.epr-main]:border-slate-600/30 [&_.epr-search-container_input]:bg-slate-900/40 [&_.epr-search-container_input]:border [&_.epr-skin-tones]:bg-transparent [&_.epr-search-container_input]:border-slate-600/30 [&_.epr-search-container_input]:ring-blue-400 [&_.epr-search-container_input:focus]:ring-offset-2 [&_.epr-search-container_input:focus]:ring-2 [&_.epr-search-container_input:focus]:ring-offset-gray-900 [&_.epr-search-container_input]:transition-none [&_.epr-emoji-category-label]:bg-gray-900 [&_.epr-emoji-category-label]:text-neutral-400 [&_.epr-emoji-category-label]:border-y [&_.epr-emoji-category-label]:border-slate-800/40 [&_.epr-emoji-category-label]:text-sm [&_.epr-emoji-category-content]:py-2 [&_.epr-btn:hover]:bg-slate-500/30 ">
      <EmojiPicker
        emojiStyle={EmojiStyle.NATIVE}
        onEmojiClick={handleEmojiClick}
        previewConfig={{
          showPreview: false,
        }}
        skinTonesDisabled
        open={true}
      />
    </div>
  );
});

export default EmojiPickerMemo;
