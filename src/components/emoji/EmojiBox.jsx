import React from "react";
import Picker from "emoji-picker-react";
import "./emojiBox.css";

function EmojiBox({ setText, setEmojiClick }) {
  const onEmojiClick = (event, emojiObject) => {
    setText((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <div className="emojibox-container">
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setEmojiClick(false)}
      ></button>
      <Picker pickerStyle={{ height: "250px" }} onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiBox;
