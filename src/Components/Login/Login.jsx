import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Login = ({ setIsLogged }) => {
  const [loginData, setLoginData] = useState({});

  const loginHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const submitHandler = () => {
    localStorage.setItem('username', loginData.username);
    localStorage.setItem('temporalToken', uuidv4()); //session identifier
    setIsLogged(true);
  };

  return (
    <div>
      <h3>Crea un usuario para chatear!</h3>
      <form>
        <input
          name="username"
          type="text"
          placeholder="Crea tu nombre de usuario"
          onChange={loginHandler}
        />
        <input type="button" value="Crear" onClick={submitHandler} />
      </form>
    </div>
  );
};
export default Login;
