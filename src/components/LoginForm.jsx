import { useState } from "react";
import PropTypes from "prop-types";


function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) return;
    onLogin(username);
  };

  return (
    <div className="login-form">
      <h2>Enter your name to join chat</h2>
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

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
