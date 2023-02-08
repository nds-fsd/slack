import { getUserToken } from "./localStorageUtils";

const fetchSupreme = (path,method, body, isToken,query) => {
  
  /*
  const ApiError = (message, data, status)=>{
    
  let response = ''
    try{
      response = JSON.parse(data);

    }catch(e){
      response= data
    }
    this.response = response;
    this.message = message;
    this.status = status;

  }
  */

  const URL_API = window.location.hostname === "https://skuadlack.netlify.app" ? "https://skuadlack.up.railway.app":"http://localhost:3001"

  let URL = URL_API + path

  const authorization = isToken && `Bearer ${getUserToken()}`;

//const authorization = isToken ? `Bearer ${getUserToken()}`: "";

/*
  if (isToken === true) {
    authorization = `Bearer ${getUserToken()}`;
  } else {
    authorization = "";
  }
*/

const queryParams = query && JSON.stringify(query)

if (queryParams){
  URL = URL + '?' + queryParams
}

  const options = {
    method: method,
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: authorization,
    },
    body:JSON.stringify(body),
  };
  
  let response = null

  return (
    fetch(URL, options)
  .then((responseObject) => {
    response=responseObject;

    if (responseObject.status === 401) {
      return {authError:true}
    }
    return response.json();
  })
  .then ((parsedResponse) =>{
    if (response.status<200 || response.status >=300){
      throw parsedResponse;
    }
    return parsedResponse
  })
  .catch((error)=>{
    //return response.json({ error: error });

  })
  )
};

export default fetchSupreme;
