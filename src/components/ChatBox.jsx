function ChatBox({ messages, currentUser, userColors }) {
  console.log("Messages received in ChatBox:", messages);  // Debugging

  if (!Array.isArray(messages)) {
    console.error("Error: messages is not an array", messages);
    return <p>No messages yet...</p>;
  }

  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className="message" 
          style={{ color: userColors[msg.user] || "black" }}
        >
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
