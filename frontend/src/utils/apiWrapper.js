import { getUserToken } from "./localStorageUtils";

const fetchSupreme = (path, method = 'GET', body, isToken, query) => {
  //path: tiene que incluir la primera barra. Ejemplo "http://localhost:3001/user" --> path = "/user"
  //method: 'GET', 'POST'...
  //body: incluir como objeto si es necesario. Si no, especificar undefined SUPER IMPORTANTE
  //isToken: si es true, quiere decir que va a verificar si tenemos token, si es false, no.
  //query: incluir como string los query params. Ejemplo inventado: /user?id='1234' --> query = 'id=1234'. Sin interrogante. si no hay nada UNDEFINDED

  const URL_API =
    window.location.hostname === "skuadlack.netlify.app"
      ? "https://skuadlack.up.railway.app"
      : "http://localhost:3001";

  let URL = URL_API + path;
  //const queryParams = query && JSON.stringify(query); --> si pongo esto no funciona el queryParams... no sé por qué
 

  if (query) {
    URL = `${URL}?${new URLSearchParams(query).toString()}`;
  }

  const options = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${getUserToken()}`,
    },
    body: JSON.stringify(body),
  };
  //console.log('Options del APIWrapper', options);

  let response = null;

  return fetch(URL, options)
    .then((responseObject) => {
      response = responseObject;
      if(responseObject.status === 204){
        return response
      }
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

};

export default fetchSupreme;
