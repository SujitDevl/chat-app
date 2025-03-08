import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import MessageInput from "./components/MessageInput";
import ChatBox from "./components/ChatBox";
import "./style.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChatUsers, setSelectedChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userColors, setUserColors] = useState({});
  const [usernames, setUsernames] = useState([]);

 useEffect(() => {
  const savedUserColors = JSON.parse(localStorage.getItem("userColors")) || {};
  setUserColors(savedUserColors)
   const savedUsernames = JSON.parse(localStorage.getItem("username") || {});
   setUsernames(savedUsernames);

 }, []) 












  // Handling sending messages

  const handleLogin = (username) => {
    if (!username.trim()) return;
    setCurrentUser(username);

    if (!userColors[username]) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      setUserColors((prevColors) => {
        const newColors = { ...prevColors, [username]: randomColor };
        localStorage.setItem("userColors", JSON.stringify(newColors));
        return newColors;
      });
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = { user: currentUser, text: text };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem(
        `messages_${currentUser}`,
        JSON.stringify(updatedMessages)
      );
      return updatedMessages;
    });
  };

  return (
    <div className="app">
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="chat-container">
          <h2>Welcome, {currentUser}!</h2>
          <ChatBox
            messages={messages}
            currentUser={currentUser}
            userColors={userColors}
          />
          <MessageInput onSend={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

export default App;
