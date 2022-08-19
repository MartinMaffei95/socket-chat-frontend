import { useRef } from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('https://soketchat-server.herokuapp.com/');

const ChatLobby = ({ isLogged, setIsLogged }) => {
  const [chatMessages, setChatMessages] = useState();
  const [message, setMessage] = useState();

  const handleMessage = (e) => {
    let { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const chatWindow = useRef();

  const sendMessage = () => {
    if (message) {
      // Crear validaciones antes de enviar Mensaje.
      if (!message.username || message.username === '')
        return console.log('error username ' + message.username);
      if (!message.message || message.message === '')
        return console.log('error message ' + message.message);
      if (!message.uuid || message.uuid === '')
        return console.log('error uuid ' + message.uuid);
      else {
        //Emitiendo Mensaje al SOCKET
        socket.emit('message', {
          username: message.username,
          message: message.message,
          dateTime: Date.now(),
          uuid: message.uuid,
        });
        setMessage({ ...message, message: '' }); //Setteando el mensaje y el input en ''
      }
    }
  };

  useEffect(() => {
    socket.on('messages', (messages) => {
      setChatMessages(messages);
    });

    return () => {
      socket.off('messages');
    };
  }, []);

  useEffect(() => {
    chatWindow.current.scroll(0, chatWindow.current.scrollHeight + 10000); //Scroll al final del chatWindow
  }, [chatMessages]);

  useEffect(() => {
    if (
      localStorage.getItem('username') &&
      localStorage.getItem('temporalToken')
    ) {
      setIsLogged(true);
      setMessage({
        ...message,
        username: localStorage.getItem('username'),
        uuid: localStorage.getItem('temporalToken'),
      });
      socket.emit('userLogged', {
        username: localStorage.getItem('username'),
        uuid: localStorage.getItem('temporalToken'),
      });
    } else {
      setIsLogged(false);
      setMessage({});
      socket.emit('userLogOut', {
        username: localStorage.getItem('username'),
        uuid: localStorage.getItem('temporalToken'),
      });
    }
  }, [isLogged]);

  return (
    <div id="chat">
      <div className="allMesagges" id="allMessages" ref={chatWindow}>
        {chatMessages &&
          chatMessages.map((m) => (
            <div
              className={`message ${
                localStorage.getItem('temporalToken') === m.uuid && 'me'
              }`}
            >
              <div
                className={`arrow-${
                  localStorage.getItem('temporalToken') === m.uuid
                    ? 'right'
                    : 'left'
                }`}
              ></div>
              <span className="message_user">{m.username}</span>
              <p className="message_message">
                {m.message}
                <span className="message_date">
                  {new Date(m.dateTime).getHours()}:
                  {new Date(m.dateTime).getMinutes() < '10'
                    ? '0' + new Date(m.dateTime).getMinutes()
                    : new Date(m.dateTime).getMinutes()}
                </span>
              </p>
            </div>
          ))}
      </div>
      <div className="sendContainer">
        <input
          type="text"
          name="message"
          placeholder="Ingresa tu mensaje"
          className="inputMessage"
          onChange={handleMessage}
          value={message?.message}
        />
        <input
          type="button"
          id="send_messageButton"
          value="Enviar"
          className="sendMessage"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};
export default ChatLobby;
