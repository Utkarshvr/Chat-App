import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        id: Math.random(),
      };

      await socket.emit("send-message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // Not a good way: It leads to message duplicaiton
  // useEffect(() => {
  //   socket.on("receive-message", (data) => {
  //     console.log({ data });
  //     const isDuplicatedMsg = messageList.some((msg) => msg.id === data.id);
  //     console.log({ isDuplicatedMsg });
  //     if (isDuplicatedMsg) return;
  //     setMessageList((list) => [...list, data]);
  //   });
  // }, [socket]);

  // Onky one time
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log({ data });
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                key={messageContent.id}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
