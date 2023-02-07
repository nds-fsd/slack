import { getUserToken } from "./localStorageUtils";

const fetchSupreme = async (path,method, body, cors, token) => {
  let URL = "";

  if (window.location === "https://skuadlack.netlify.app") {
    URL = "https://skuadlack.up.railway.app";
  } else {
    URL = "http://localhost:3001";
  }



  let authorization = "";

  if (token === true) {
    authorization = `Bearer ${getUserToken()}`;
  } else {
    authorization = "";
  }

  const options = {
    method: method,
    mode: cors,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: authorization,
    },
    body:JSON.stringify(body),
  };

  return fetch(URL + path, options).then((res) => {
    res.json();
  });
};

export default fetchSupreme;
