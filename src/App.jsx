import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import "./style.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userColors, setUserColors] = useState({});

  const handleLogin = (username) => {
    if (!username.trim()) return;
    setCurrentUser(username);

    if (!userColors[username]) {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      setUserColors((prevColors) => ({
        ...prevColors,
        [username]: randomColor,
      }));
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      user: currentUser,
      text: text,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="Talky Bird">
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div className="chat-container">
          <h2>Welcome,  {currentUser}!</h2>
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
