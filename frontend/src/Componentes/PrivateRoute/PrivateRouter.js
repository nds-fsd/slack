import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../../utils/localStorageUtils.js"

// "getUserToken" tiene q venir de local storage para redireccionar las rutas en caso de no coincidir

const PrivateRoutes = () => {
  if (getUserToken()) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />; //redirigir a login 
  }
};
export default PrivateRoutes;
/*
---------------OTRA FORMA QUE QUIERO PROBAR------------      


import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    if(!token || !tokenExpiration || Date.now() >= tokenExpiration) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return <Redirect to='/' />
    }
  }, []);
  
  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} />
      )}
    />
  );
};

export default PrivateRoute;
*/