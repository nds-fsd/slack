import './App.css';
import FormUser from './Componentes/FormularioUsuario/formUser';
import FormOrganizacion from './Componentes/FormularioOrganizacion/formOrganizacion.jsx';
import LandingPage from './Componentes/LandingPage/LandingPage';
import ListUsers from './Componentes/ListUsers/listUsers';
import { Routes, Route, Link } from "react-router-dom"
import styles from "./Styles/App.module.css"
import logo from "./Assets/logo-SkuadLack.png"
import DashboardUser from './Componentes/DashboardUsuario/dashboardUser';
import NotFound from './Componentes/NotFound/notFound';
import FormUser1 from './Componentes/FormularioUsuario/formUser1';
import EditUser from './Componentes/editUser.js/editUser';

//react router dom está en la clase de React Router. Webpack y Eslint --> minuto 01:13:00

function App() {

  return (
    <div className={styles.contenedorPrincipal}>
      <div className={styles.navBar}>

        <Link to="/"><img className={styles.logo} src={logo} alt='logo' /></Link>
        <Link to="/" className='link'>SkuadLack</Link>
        <Link to="/producto" className='link'> Producto</Link>
        <Link to="/enterprise" className='link'> Enterprise</Link>
        <Link to="/recurso" className='link'>Recurso</Link>
        <Link to="/precios" className='link'>Precios</Link>
        {/* <a> Producto</a>
                    <a> Enterprise</a>
                    <a> Recurso</a>
      <a> Precios</a>*/}
        <Link to="/user" className='link'>Regístrate</Link>
        <Link to='/organizacion' className='link'> Crear organización</Link>
        <Link to='/users'>Admin</Link>
      </div>


      <div className={styles.mainRouter}>

        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/organizacion" element={<FormOrganizacion />}>  </Route>
          <Route path="/user" element={<FormUser />}>  </Route>
          <Route path="/" element={<LandingPage />}></Route>

        </Routes>

      </div>

    </div>
  );
}

export default App;
