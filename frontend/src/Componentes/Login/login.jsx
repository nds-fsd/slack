import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserSession } from "../../utils/localStorageUtils";
import styles from "./login.module.css"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  // fetch login
  const sendLogin = () => {
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => {
        return response.json();

      }).then((res) => {
        if (res.token) {
          setUserSession(res)
          navigate(`/LUP/${res.user.id}`)

        }
      })
  };

  return (
    <div className={styles.contenedor}>

      <div className={styles.title}>
        <h3>Login</h3>
      </div>

      <div className={styles.formulario}>
        <label htmlFor="email">email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <label htmlFor="password">password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className={styles.botonLogin} onClick={() => sendLogin()}>Login</button>
      </div>
    </div>
  );
};
export default Login;