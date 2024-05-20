import React, { useEffect, useState } from 'react';

const Chat = ({ socket, user, roomId }) => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (message !== '') {
      const messageObj = {
        room: roomId,
        user: user,
        message: message,
        timeStamp:
          new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_chat', messageObj);
      setMessageList((list) => [...list, messageObj]);
      setMessage(''); // Clear the input field after sending
    }
  };

  useEffect(() => {
    socket.on('received_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <div className="chat-header">
        <p>BuzzChat</p>
      </div>
      <div className="chat-body">
        {messageList.map((msg, index) => {
          return (
            <div
              key={index}
              className={`message ${msg.user === user ? 'sent' : 'received'}`}
            >
              <span className='username'>{msg.user}: </span>
              {msg.message}<br /> <span className='username'>{msg.timeStamp}</span>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Chat;
