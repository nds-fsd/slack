import { CloudinaryContext } from "cloudinary-react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";

// Definimos el componente CloudinaryUpload
export const CloudinaryUpload = () => {
  // Definimos dos estados del componente: images para almacenar las imágenes cargadas en Cloudinary y previewImages para almacenar las imágenes previsualizadas antes de cargarlas
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Definimos la URL de la API de Cloudinary para cargar imágenes
  const url = "https://api.cloudinary.com/v1_1/dnsy1t6dj/auto/upload";

  // Esta función se activa cuando el usuario carga una o varias imágenes en el componente
  const handleImageUpload = async (event) => {
    // Obtenemos los archivos seleccionados
    const files = event.target.files;

    // Creamos dos arrays vacíos para almacenar las imágenes cargadas y las previsualizadas
    const uploadedImages = [];
    const previewedImages = [];

    // Iteramos sobre los archivos seleccionados
    for (let i = 0; i < files.length; i++) {
      // Obtenemos el archivo actual
      const file = files[i];

      // Creamos un objeto FormData que contiene el archivo y un objeto upload_preset que indica el preset de Cloudinary utilizado para subir la imagen
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "w6v9atp0");

      // Hacemos una solicitud POST a la API de Cloudinary con el objeto FormData y recibimos una respuesta JSON que contiene la URL segura de la imagen cargada en Cloudinary
      const options = { method: "POST", body: formData };
      const response = await fetch(url, options);
      const json = await response.json();
      uploadedImages.push(json.secure_url);

      // Creamos una URL local para la previsualización de la imagen cargada
      const imageURL = URL.createObjectURL(file);
      previewedImages.push(imageURL);
    }

    // Actualizamos los estados del componente con las imágenes cargadas y previsualizadas
    setImages([...images, ...uploadedImages]);
    setPreviewImages([...previewImages, ...previewedImages]);
  };

  // Esta función se activa cuando el usuario elimina una imagen de la lista de imágenes cargadas
  const handleImageRemove = (index) => {
    // Creamos copias de las listas de imágenes cargadas y previsualizadas
    const newImages = [...images];
    const newPreviewImages = [...previewImages];

    // Eliminamos la imagen seleccionada de ambas listas
    newImages.splice(index, 1);
    newPreviewImages.splice(index, 1);

    // Actualizamos los estados del componente con las nuevas listas de imágenes cargadas y previsualizadas
    setImages(newImages);
    setPreviewImages(newPreviewImages);
  };

  // Devolvemos el componente JSX que muestra la nube de Cloudinary y las imágenes cargadas y previsualizadas
  return (
    // Configuración de CloudinaryContext para usar la API de Cloudinary
    <CloudinaryContext
      cloudName="dnsy1t6dj"
      apiKey="573675825162776"
      apiSecret="Q71fKH8AO31JQ-AILjoJx344_Eg"
      secure={true}
    >
      <div>
        <Button
          variant="dark"
          size="sm"
          style={{
            margin: "1rem",
          }}
        >
          <label htmlFor="image-upload">
            <AiOutlineUpload />
          </label>
          <input
            type="file"
            id="image-upload"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            multiple
          />
        </Button>
      </div>
      <div
        style={{
          width: "18rem",

          background: "black",
          position: "absolute",
          padding: 0,
          borderRadius: "1rem",
          bottom: 60,
          right: 130,
          display: "inline",
        }}
      >
        {previewImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "8rem",
              display: "inline",
              height: "8rem",
              
              
            }}
          >
            <img src={image} alt="Imagen Cargada" style={{borderRadius: "1rem",}}/>
            <Button
              variant="danger"
              style={{
                position: "absolute",
                top: -45,
                right: 5,
                cursor: "pointer",
                fontSize: ".8rem",
                padding: ".3rem",
              }}
              onClick={() => handleImageRemove(index)}
            >
              &times;
            </Button>
          </div>
        ))}
      </div>
    </CloudinaryContext>
  );
};
