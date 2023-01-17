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
