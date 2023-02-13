import { getUserToken } from "./localStorageUtils";

const fetchSupreme = (path, method, body, isToken, query) => {
  //path: tiene que incluir la primera barra. Ejemplo "http://localhost:3001/user" --> path = "/user"
  //method: 'GET', 'POST'...
  //body: incluir como objeto si es necesario. Si no, especificar undefined SUPER IMPORTANTE
  //isToken: si es true, quiere decir que va a verificar si tenemos token, si es false, no.
  //query: incluir como string los query params. Ejemplo inventado: /user?id='1234' --> query = 'id=1234'. Sin interrogante

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

  const URL_API =
    window.location.hostname === "https://skuadlack.netlify.app"
      ? "https://skuadlack.up.railway.app"
      : "http://localhost:3001";

  let URL = URL_API + path;

  const authorization = isToken && `Bearer ${getUserToken()}`;

  const queryParams = query && JSON.stringify(query);

  if (queryParams) {
    URL = `${URL}'?'${queryParams}`;
  }

  const options = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: authorization,
    },
    body: JSON.stringify(body),
  };
  console.log('Options del APIWrapper', options);

  let response = null;

  return fetch(URL, options)
    .then((responseObject) => {
      response = responseObject;

      if (responseObject.status === 401) {
        return { authError: true };
      }
      return response.json();
    })
    .then((parsedResponse) => {
      if (response.status < 200 || response.status >= 300) {
        throw parsedResponse;
      }
      return parsedResponse;
    })
    .catch((error) => {
      //pendiente implementacion
      //return parsedResponse.json(error)
    });
};

export default fetchSupreme;
