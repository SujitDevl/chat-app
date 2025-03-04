import { useState } from "react";
import PropTypes from "prop-types";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

MessageInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default MessageInput;
