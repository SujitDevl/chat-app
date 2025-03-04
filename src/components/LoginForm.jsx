import { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      onLogin(username);
      setUsername("");
    }
  };

  return (
    <div className="username-container">
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSubmit}>Join Chat</button>
    </div>
  );
}

export default LoginForm;
