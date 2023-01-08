
export const postToMongo = async( path, data ) => {
    const url = `http://localhost:3001/${path}`
    const response = await fetch(url,{
        method: "POST", // metodo 
        mode: "cors", // salvarnos de cors
        headers: {
            "Content-Type": "application/json", // que tipo de dato se manda
            "Accept": "application/json", // que tiene que aceptar
        }, 
        body: JSON.stringify(data), // pasamos a sting por que http no permite mandar JSON
    } )
    const dataServer = await response.json()
    return dataServer
}

export const getFromMongo = async(path) => {
    const url = `http://localhost:3001/${path}`
    const response = await fetch(url) // get
    const data = response.json()
    return data 
}