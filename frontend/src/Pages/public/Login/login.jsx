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
  const [data, setData] = useState("")
  const switchShow = () => setShow(!show);

  const navigate = useNavigate()
  // fetch login
  const sendLogin = () => {
    const bodyLogin = {
      email,
      password
    }

    fetchSupreme('/login', 'POST', bodyLogin, false, undefined)
      .then((res) => {
        if (res.token) {
          setUserSession(res)
          if (hasPermission('GLOBAL_ADMIN')) {
            navigate('/users')
          } else {
            navigate(`/LUP/${res.user.id}`)
          }
        }
      }).catch((error) => {
        Object.keys(error).forEach((key) => {
          setData(error)        })
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
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        {data && data.error.email && (<p className={styles.error}>{data.error.email}</p>)}
        <div className={styles.password}>
          <input id="password" type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} placeholder="Password" />
          <button type="button" onClick={switchShow}>{show ? '🔒' : '👁️‍🗨️'}</button>
          {data && data.error.password && (<p className={styles.error}>{data.error.password}</p>)}
        </div>
        <button type="submit" className={styles.botonLogin} onClick={() => sendLogin()}>Login</button>
      </div>
    </div>
  );
};
export default Login;