import './App.css';
import FormUser from './Componentes/FormularioUsuario/formUser';
import FormOrganizacion from './Componentes/FormularioOrganizacion/formOrganizacion.jsx';
import LandingPage from './Componentes/LandingPage';
import {Routes, Route, Link} from "react-router-dom"
import styles from "./Styles/App.module.css"
import logo from "./Assets/logo.png"

//react router dom está en la clase de React Router. Webpack y Eslint --> minuto 01:13:00

function App() {

  return (
    <div>
      <div className={styles.navBar}>

                    <Link to="/"><img className={styles.logo} src={logo} alt='logo'/></Link>
                    <Link to="/" className='link'> <a>SkuadLack</a></Link>
                    <a> Producto</a>
                    <a> Enterprise</a>
                    <a> Recurso</a>
                    <a> Precios</a> 
                    <Link to="/user" className='link'><a> Log in</a></Link> 
                    <Link to='/organizacion' className='link'> <a>Crear organización</a></Link>
               
            </div>

      
    <div className='main-router'>
      <Routes>

        <Route path="/organizacion" element={<FormOrganizacion />}>  </Route>
        <Route path="/user" element={<FormUser/>}>  </Route>
        <Route path="/" element={<LandingPage/>}></Route>

      </Routes>

      </div>

    </div>
  );
}

export default App;
