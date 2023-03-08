import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchSupreme from "../../../utils/apiWrapper";
import { setUserSession } from "../../../utils/localStorageUtils";
import { hasPermission } from "../../../utils/rolePermissUtils";
import styles from "./login.module.css"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const switchShow = () => setShow(!show);

  const navigate = useNavigate()
  // fetch login
  const sendLogin = () => {
    
    const bodyLogin ={
      email,
      password
    }
    
    fetchSupreme('/login','POST',bodyLogin,false,undefined)
    
    /*
    const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"
    fetch(`${URL_API}/login`, {
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

      })
       */
       
      .then((res) => {

        console.log('Response del Login',res)

        if (res.token) {
          setUserSession(res)
         if(hasPermission('GLOBAL_ADMIN')){
          navigate('/users')
         }else{
          navigate(`/LUP/${res.user.id}`)
         }           
        }
      })
  };
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        sendLogin();
      }
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
        <div className={styles.password}>
        <input type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} placeholder="Password" />
        <button type="button" onClick={switchShow}>{show ? '🔒' : '👁️‍🗨️'}</button>
        </div>
        <button type="submit" className={styles.botonLogin} onClick={() => sendLogin()}>Login</button>
      </div>
    </div>
  );
};
export default Login;