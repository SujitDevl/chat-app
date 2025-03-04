import PropTypes from "prop-types";


function ChatBox({ messages, currentUser, userColors }) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return <p className="no-messages">No messages yet. Start chatting! 🚀</p>;
  }

  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`message ${msg.user === currentUser ? "my-message" : "other-message"}`}
        >
          <strong style={{ color: userColors[msg.user] || "#000" }}>
            {msg.user}:
          </strong>
          <span> {msg.text} </span>
        </div>
      ))}
    </div>
  );
}

ChatBox.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.string.isRequired,
  userColors: PropTypes.object.isRequired,
};

export default ChatBox;
