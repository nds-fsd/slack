import { getUserRole } from "./localStorageUtils";


export const hasPermission = (permission) => {
    const userPermission = getUserRole();
     if (permission === userPermission){
        return userPermission
     }else{
        return null
     }
}