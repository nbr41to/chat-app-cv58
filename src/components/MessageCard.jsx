import dayjs from 'dayjs';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useState } from 'react';
import { Emoji } from 'emoji-mart';

const MessageCard = ({ message }) => {
  const { name, content, sendAt } = message;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const emojiSelect = (emoji) => {
  setSelectedEmoji(emoji.native);
  setIsOpen(!isOpen);
  };

  return (
    <div >
      <span style={{ fontWeight: 'bold' }}>
        {name}{' '}:{' '}
      </span>
      <span>{content}</span>
      <span style={{ fontStyle: 'italic' }}>
        {' '}[{dayjs(sendAt.toDate()).format('YYYY/MM/DD HH:MM:ss')}]
      </span>
      {selectedEmoji}
      <button onClick={() => setIsOpen(!isOpen)}>えもじ</button>
      {isOpen ? (
        <Picker set='apple' onSelect={(emoji) => emojiSelect(emoji)} />
      ) : (
      <></>
      )}
    </div>
  );
};

export default MessageCard;
