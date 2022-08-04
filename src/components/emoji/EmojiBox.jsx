import React, { useEffect, useRef } from "react";
import Picker from "emoji-picker-react";
import "./emojiBox.css";

const useClickOutsideDot = (handler) => {
  const dotMenuRef = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (!dotMenuRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return dotMenuRef;
};

function EmojiBox({ text, setText, setEmojiClick }) {
  const onEmojiClick = (event, emojiObject) => {
    if (text === undefined) setText(() => "" + emojiObject.emoji);
    else setText((prevInput) => prevInput + emojiObject.emoji);
  };

  let dotMenuElement = useClickOutsideDot(() => {
    setEmojiClick(false);
  });

  return (
    <div className="emojibox-container" ref={dotMenuElement}>
      <Picker pickerStyle={{ height: "250px" }} onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiBox;
