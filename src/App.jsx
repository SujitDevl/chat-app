import { useState, useRef, useEffect } from "react";
import "/src/style.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState([]);
  const [userColors, setUserColors] = useState({});
  const messageRef = useRef(null);

  const getRandomColor = () => {
    const colors = ["#ff5733", "#33ff57", "#3357ff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    if (username && !userColors[username]) {
      setUserColors((prevColors) => ({
        ...prevColors,
        [username]: getRandomColor(),
      }));
    }
  }, [username, userColors]);

  const sendMessage = () => {
    const newMessage = messageRef.current.value.trim();
    if (!newMessage) return;
    if (!username || username.trim() === "") return;

    if (!userColors[username]) {
      setUserColors((prevColors) => {
        const newColors = { ...prevColors, [username]: getRandomColor() };
        return newColors;
      });
    }

    setMessages([...messages, { user: username, text: newMessage }]);
    messageRef.current.value = "";
  };
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
          {messages.map((message, index) => (
            <p
              key={index}
              className={`message ${
                message.user === username ? "my-message" : "other-message"
              }`}
              style={{ borderColor: userColors[message.user] || "#000" }}
            >
              <strong style={{ color: userColors[message.user] || "#000" }}>
                {message.user}
              </strong>
            </p>
          ))}
        </div>
        <div className="input-container">
          <input ref={messageRef} type="text" placeholder="Type a message" />
          <button onClick={sendMessage}>Send </button>
        </div>
      </div>
    </>
  );
}

export default App;
