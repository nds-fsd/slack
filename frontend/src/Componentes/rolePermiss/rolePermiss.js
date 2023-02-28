import { Navigate } from "react-router-dom";
import NotFound from "../../Pages/public/NotFound/notFound";
import { hasPermission } from "../../utils/rolePermissUtils";



const RolePermiss = ({permission, children}) => {
  if (hasPermission(permission)) {
    return children;
  } if (hasPermission(permission) === null){
    return <Navigate to="/*" />;
    
  }
};
export default RolePermiss;