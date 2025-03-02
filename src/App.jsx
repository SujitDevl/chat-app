import { useState, useRef } from "react";
import "./style.css";

import LoginForm from "./components/LoginForm";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";

function ChatApp() {
  const [messages, setMessages] = useState([]);
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

  const handleLogin = (username) => {
    if (!username.trim()) return;

    if (!userColors[username]) {
      setUserColors((prevColors) => ({
        ...prevColors,
        [username]: getRandomColor(),
      }));
    }

    setCurrentUser(username);
  };

  // Send message
  const sendMessage = () => {
    const newMessage = messageRef.current.value.trim();
    if (!newMessage || !currentUser) return;

    setMessages([...messages, { user: currentUser, text: newMessage }]);
    messageRef.current.value = "";
  };

  return (
    <div className="chat-container">
      <h2>Talky Bird</h2>

      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <h3>Welcome, {currentUser}!</h3>

          <ChatBox
            messages={messages}
            currentUser={currentUser}
            userColors={userColors}
          />
          <MessageInput messageRef={messageRef} onSend={sendMessage} />
        </>
      )}
    </div>
  );
}

export default ChatApp;
