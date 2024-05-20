import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect('http://localhost:4000');

function App() {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [goToChat, setGoToChat] = useState(false);

  const joinRoom = () => {
    if (userName !== '' && roomId !== '') {
      setGoToChat(true);
      socket.emit('join_room', roomId);
    }
  };

  return (
    <div className="chat-container">
      {!goToChat ? (
        <div>
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <br />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} user={userName} roomId={roomId} />
      )}
    </div>
  );
}

export default App;
