import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import MessageInput from "./components/MessageInput";
import ChatBox from "./components/ChatBox";
import "./style.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userColors, setUserColors] = useState({});
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const savedUserColors =
      JSON.parse(localStorage.getItem("userColors")) || {};
    setUserColors(savedUserColors);
    const savedUsernames = JSON.parse(localStorage.getItem("username") || {});
    setUsernames(savedUsernames);
  }, []);

  useEffect(() => {
    if (selectedChatUser) {
      const savedMessages =
        JSON.parse(
          localStorage.getItem(`messages_${currentUser}_${selectedChatUser}`)
        ) || [];
      setMessages(savedMessages);
    }
  }, [selectedChatUser, currentUser]);

  // Handle user login

  const handleLogin = (username) => {
    if (!username.trim()) return;
    setCurrentUser(username);
    setSelectedChatUser(null);

    if (!usernames.includes(username)) {
      const updatedUsernames = [...usernames, username];
      setUsernames(updatedUsernames);
      localStorage.setItem("usernames", JSON.stringify(updatedUsernames));
    }

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

  // Handle send message
  const handleSendMessage = (text) => {
    if (!text.trim() || !selectedChatUser) return;

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
        LoginForm onLogin = {handleLogin} />
      ) : (
        <div className="chat-container">
          <h2>Welcome, {currentUser}!</h2>

          <div className="chat-list">
            <h3>Chat List</h3>
            {usernames.map((user, index) => (
              user !== currentUser && (
                <p
                key={index}
                  classname={`chat-user ${selectedChatUser === user ? "active" : ""}`}
                  style={{color: userColors[user] || "#000"}}
                  onClick={()=> setSelectedChatUser(user)}
                >
                  
                </p>
              )
            ))}
          </div>
        </div>
    </div>
  )
}

export default App;
