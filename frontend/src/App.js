import './App.css';
import { Routes, Route, useLocation } from "react-router-dom"
import styles from "./Styles/App.module.css"
import NotFound from './Pages/public/NotFound/notFound';
import Register from './Pages/public/Register/register';
import EditUserPage from './Pages/private/EditUserPage/editUserPage';
import InfoSlack from './Pages/public/infoSlack/InfoSlack';
import { BarraNav } from './Componentes/BarraNav/BarraNav';
import ListUserBootstrap from './Componentes/ListUserBootstrap/listUserBootstrap';
import Login from './Pages/public/Login/login';
import PrivateRoutes from './Componentes/PrivateRoute/PrivateRouter.js'
import LandingUserPage from './Pages/private/LandingUser/LandingUserPage';
import SkuadlackPage from './Pages/private/SkuadlackPage/SkuadlackPage';
import AboutUs from './Pages/public/AboutUs/AboutUs';
import { SkuadLackContextProvider } from './contexts/skuadLack-context';
import CreateOrganization from './Pages/private/CreateOrganization/createOrganization';
import LandingPage from './Pages/public/LandingPage/LandingPage';
import ChatPage from './Pages/private/ChatPage/ChatPage';
import { SocketContextProvider } from './contexts/useSocket';
import RolePermiss from './Componentes/rolePermiss/rolePermiss';
import PublicChat from './Componentes/public-chat/public-chat';
import ListOrgBootstrap from './Componentes/listOrgBootstrap/listOrgBootstrap';
import ListChannelsBootstrap from './Componentes/listChannelsBootstrap/listChannelsBootstrap';


//react router dom está en la clase de React Router. Webpack y Eslint --> minuto 01:13:00

//Los imports comentados no se estan utilizando

function App() {
  const location = useLocation();

  return (
    <>

      <div className={styles.contenedorPrincipal}>
        <BarraNav />
        <Routes>
          <Route path="/" element={<LandingPage />}/>

          <Route path="/" element={<PrivateRoutes />}>
            {/*Las siguientes rutas son Outlet de PrivateRoutes*/}
            <Route path="/organizacion" element={<CreateOrganization />}/>
            <Route path="/user/:id" element={<EditUserPage />}/>
            <Route path="/LUP/:id" element={<LandingUserPage />} />
            <Route path="/publicChat" element={<PublicChat />} />
            <Route path="/users" element={
              <RolePermiss permission={'GLOBAL_ADMIN'}>
                <ListUserBootstrap />
              </RolePermiss>}>
            </Route>
            <Route path="/organizations" element={
              <RolePermiss permission={'GLOBAL_ADMIN'}>
                <ListOrgBootstrap />
              </RolePermiss>}>
            </Route>
            <Route path="/channels" element={
              <RolePermiss permission={'GLOBAL_ADMIN'}>
                <ListChannelsBootstrap />
              </RolePermiss>}>
            </Route>
            <Route path="/skuadlack/:id" element={
              <SkuadLackContextProvider>
                <ChatPage />
              </SkuadLackContextProvider>
            }>  </Route>

          </Route>


          <Route path="/user" element={<Register />}>  </Route>
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