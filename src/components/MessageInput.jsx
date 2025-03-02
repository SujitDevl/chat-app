function MessageInput(messageRef, onSend) {
  return (
    <div className="input-container">
      <input ref={messageRef} type="text" placeholder="Type a message" />
      <button onClick={onSend}>Send</button>
    </div>
  );
}

export default MessageInput;
