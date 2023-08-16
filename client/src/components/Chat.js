import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from '@mui/material/TextareaAutosize';


function Chat({ socket, username, room }) {

  const [currMessage, setCurrMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((list) => [...list, data]);
    })
  }, [socket])

  const sendMessage = async () => {
    if (currMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currMessage,
        time: new Date().toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}),
        // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessages((list) => [...list, messageData]);
      setCurrMessage("");
    }
  };

  const renderMessage = (message) => {

    const className = (username === message.author ? "Messages-message currentMember" : "Messages-message");
    // console.log(className);
    return (
      <li className={className}>
        <div className="Message-content">
          <div className="username">{message.author}</div>
          <div className="text">{message.message}</div>
          <div className="time-stamp">{message.time}</div>
        </div>
      </li>
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
      <>
        <h3>Current Room: {room} </h3>
        
        <div style={{'width': 'calc(50%)', 'height': 'calc(85% - 106px)'}}>
          {/* TODO: Adjust can only see the button in light theme (issues with CSS here) */}
          <ScrollToBottom className="h-100">
            <ul className="Messages-list">
              {messages.map(m => renderMessage(m))}
            </ul>
          </ScrollToBottom>
        </div>
          <div className='d-flex align-items-end justify-content-center mb-4 mt-3 w-75'>
            <TextareaAutosize
              onChange={e => setCurrMessage(e.target.value)}
              aria-label="minimum height"
              minRows={1}
              placeholder="Enter a Message"
              value={currMessage}
              autoFocus={true}
              className='chat-textarea'
              onKeyDown={handleKeyDown}
            />
            <button className="send-button" onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
      </>
  );
}

export default Chat;
