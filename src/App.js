import './App.css';
import { useState, useEffect } from 'react';
import Login from './Components/Login/Login';
import ChatLobby from './Components/ChatLobby/ChatLobby';

function App() {
  //Validar si esta logeado
  // en caso de que no NO permitir que envie mensajes
  const [isLogged, setIsLogged] = useState(false);

  const closeSession = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('temporalToken'); //session identifier
    setIsLogged(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Socket Test v1</h1>
        {isLogged ? (
          <div className="usernameDIV">
            {/* TEMP ClassName  */}
            <p>Usuario : {localStorage.getItem('username')}</p>
            <button onClick={closeSession}> Salir </button>
          </div>
        ) : (
          <Login setIsLogged={setIsLogged} isLogged={isLogged} />
        )}
      </header>
      <div className="container">
        {/* <div className="users">
          <ul className="users_List">
            users:
            <li>User 1</li>
            <li>User 1</li>
            <li>User 1</li>
          </ul>
        </div> */}
      </div>
      <ChatLobby setIsLogged={setIsLogged} isLogged={isLogged} />
    </div>
  );
}

export default App;
