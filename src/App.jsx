import { useState, useRef } from "react";
import "./style.css";

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [userColors, setUserColors] = useState({});
  const messageRef = useRef(null);

  const getRandomColor = () => {
    const colors = [
      "#ff5733",
      "#33ff57",
      "#3357ff",
      "#ff33a8",
      "#a833ff",
      "#ff8c33",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleLogin = () => {
    if (!username.trim()) return;

    if (!userColors[username]) {
      setUserColors((prevColors) => ({
        ...prevColors,
        [username]: getRandomColor(),
      }));
    }

    setCurrentUser(username); 
    setUsername(""); 
  };

  // Function to send a message
  const sendMessage = () => {
    const newMessage = messageRef.current.value.trim();
    if (!newMessage || !currentUser) return;

    setMessages([...messages, { user: currentUser, text: newMessage }]);
    messageRef.current.value = ""; // Clear input field
  };

  return (
    <div className="chat-container">
      <h2>Talky Bird</h2>

      {!currentUser ? (
        <div className="username-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Join Chat</button>
        </div>
      ) : (
        <>
          <h3>Welcome, {currentUser}!</h3>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`message ${
                  msg.user === currentUser ? "my-message" : "other-message"
                }`}
                style={{ borderColor: userColors[msg.user] || "#000" }}
              >
                <strong style={{ color: userColors[msg.user] || "#000" }}>
                  {msg.user}
                </strong>
                {msg.text}
              </p>
            ))}
          </div>

          <div className="input-container">
            <input ref={messageRef} type="text" placeholder="Type a message" />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatApp;
