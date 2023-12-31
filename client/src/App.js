import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (event) => {
    event.preventDefault();
    if (username !== "" && room !== "") {
      socket.emit("join-room", room);
      setShowChat(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leave-room", room);
    setShowChat(false);
  };

  return (
    <div className="App">
      {!showChat ? (
        <form onSubmit={joinRoom} className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </form>
      ) : (
        <Chat
          socket={socket}
          username={username}
          leaveRoom={leaveRoom}
          room={room}
        />
      )}
    </div>
  );
}

export default App;
