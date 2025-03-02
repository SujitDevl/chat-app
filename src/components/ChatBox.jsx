function ChatBox(messages, currentUser, userColors) {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <p
          key={index}
          className={`message ${
            msg.user === currentUser ? "my-message" : "other-message"
          }`}
        >
          <strong style={{ color: userColors[msg.user] || "#000" }}>
            {msg.text}
          </strong>
        </p>
      ))}
    </div>
  );
}

export default ChatBox;
