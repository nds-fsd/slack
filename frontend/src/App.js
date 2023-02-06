import './App.css';
// import FormUser from './Componentes/FormularioUsuario/formUser';
import FormOrganizacion from './Componentes/FormularioOrganizacion/formOrganizacion.jsx';
import LandingPage from './Componentes/LandingPage/LandingPage';
//import ListUsers from './Componentes/ListUsers/listUsers';
import { Routes, Route } from "react-router-dom"
import styles from "./Styles/App.module.css"
//import DashboardUser from './Componentes/DashboardUsuario/dashboardUser';
import NotFound from './Componentes/NotFound/notFound';
import FormUser1 from './Componentes/FormularioUsuario/formUser1';
import EditUser from './Componentes/editUser/editUser';
import { InfoSlack } from './Componentes/infoSlack/InfoSlack';
import { BarraNav } from './Componentes/BarraNav/BarraNav';
import ListUserBootstrap from './Componentes/ListUserBootstrap/listUserBootstrap';
import Login from './Componentes/Login/login';
import PrivateRoutes from './Componentes/PrivateRoute/PrivateRouter.js'
import { LandingUserPage } from './Componentes/LandingUser/LandingUserPage';
import { SkuadlackPage } from './Componentes/SkuadlackPage/SkuadlackPage';
import AboutUs from './Componentes/AboutUs/AboutUs';



//react router dom está en la clase de React Router. Webpack y Eslint --> minuto 01:13:00

//Los imports comentados no se estan utilizando

function App() {

  return (

    <>
      <BarraNav />
      <div className={styles.mainRouter}>

        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/" element={<PrivateRoutes />}>
            {/*Las siguientes rutas son Outlet de PrivateRoutes*/}
            <Route path="/organizacion" element={<FormOrganizacion />}>  </Route>
            <Route path="/user/:id" element={<EditUser />}>  </Route>
            <Route path="/LUP/:id" element={<LandingUserPage />} />
            <Route path="/users" element={<ListUserBootstrap />}></Route>
            <Route path="/skuadlack" element={<SkuadlackPage />}>  </Route>

          </Route>
          <Route path="/user" element={<FormUser1 />}>  </Route>
          {/* <Route path="/editUser/:id" element=>  </Route> */}
          <Route path="/InfoSlack" element={<InfoSlack />} >  </Route>
          <Route path="/contactUs" element={<AboutUs />} >  </Route>



          <Route path='/*' element={<NotFound />} />
          <Route path="/login" element={<Login />} />


        </Routes>

      </div>
    </>

  );
}

export default App;