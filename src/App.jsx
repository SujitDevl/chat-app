import { useState, useRef } from "react";
import "/src/style.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState([]);
  const messageRef = useRef(null);

const sendMessage = () => {
  const newMessage = messageRef.current.value.trim()
  if(!newMessage) return;
  if(!username.trim()) return;

  setMessages([...messages, {user:username, text: newMessage}])
  messageRef.current.value = " "
}
  return (
    <>
      <div className="chat-container">
        <h2>Talky Penguin</h2>

        <div className="username-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <p key={index} className="message">
              {msg}
            </p>
          ))}
        </div>
        <div className="input-container">
          <input ref={messageRef} type="text" placeholder="Type a message" />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;
