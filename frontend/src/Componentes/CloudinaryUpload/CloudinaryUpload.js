import { useEffect } from "react";
import { CloudinaryContext } from "cloudinary-react";
import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { HiPhotograph } from "react-icons/hi";

export const CloudinaryUpload = ({
  imageHandler,
  passUrlCloudinary,
  setCloseUploadImages,
  stateShowImage,
  passDatafromCloudinary,
  stateCleanImage,
}) => {
  // Definimos dos estados del componente: images para almacenar las imágenes cargadas en Cloudinary y
  // previewImages para almacenar las imágenes previsualizadas antes de cargarlas
  const [images, setImages] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (stateShowImage === false) {
      setPreviewImages([]);
    }
  }, [stateShowImage]);

  const url = "https://api.cloudinary.com/v1_1/dnsy1t6dj/image/upload";

  const handleImageUpload = async (event) => {
  // Obtenemos los archivos seleccionados
  // Creamos dos arrays vacíos para almacenar las imágenes cargadas y las previsualizadas
    setCloseUploadImages(true);
    const files = event.target.files;

    const uploadedImages = [];
    const previewedImages = [];

    // Iteramos sobre los archivos seleccionados
    for (let i = 0; i < files.length; i++) {
      // Obtenemos el archivo actual
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "w6v9atp0");

      // Hacemos una solicitud POST a la API de Cloudinary con el objeto FormData y recibimos una respuesta JSON que contiene la....
      //...security_url, la url de imagen cargada en Cloudinary
      const options = { method: "POST", body: formData };
      const response = await fetch(url, options);
      const json = await response.json();
      uploadedImages.push(json.secure_url);
      passUrlCloudinary(json.secure_url);

      // Creamos una URL local para la previsualización de la imagen cargada
      const imageURL = URL.createObjectURL(file);
      previewedImages.push(imageURL);
    }

    // Actualizamos los estados del componente con las imágenes cargadas y previsualizadas
    setImages([...images, ...uploadedImages]);
    setPreviewImages([...previewImages, ...previewedImages]);
    imageHandler([...images, ...uploadedImages]);
    passDatafromCloudinary(uploadedImages);
  };

  // Esta función se activa cuando el usuario elimina una imagen de la lista de imágenes cargadas
  const handleImageRemove = (index) => {
    const newImages = [...images];
    const newPreviewImages = [...previewImages];

    // Eliminamos la imagen seleccionada de ambas listas
    newImages.splice(index, 1);
    newPreviewImages.splice(index, 1);

    // Actualizamos los estados del componente con las nuevas listas de imágenes cargadas y previsualizadas
    setImages(newImages);
    setPreviewImages(newPreviewImages);
    imageHandler(newImages);
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Upload images
    </Tooltip>
  );

  return (
    // Configuración de CloudinaryContext para usar la API de Cloudinary
    <CloudinaryContext
      cloudName="dnsy1t6dj"
      apiKey="573675825162776"
      apiSecret="Q71fKH8AO31JQ-AILjoJx344_Eg"
      secure={true}
    >
      <div>
          <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
        <Button
          variant="outline-dark"
          size="md"
          style={{
            margin: "1rem",
          }}
        >
          <label htmlFor="image-upload">
            <HiPhotograph style={{fontSize:'2rem'}}/>
          </label>
          <input
            type="file"
            id="image-upload"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            multiple
          />
        </Button>
        </OverlayTrigger>

      </div>
      
      {stateShowImage && (
        <div
          style={{
            width: "18rem",
            background: "black",
            position: "absolute",
            padding: 0,
            borderRadius: "1rem",
            bottom: 66  ,
            right: 130,
            display: "inline",
            overflowY: "hidden",
          }}
        >

          {previewImages.map((image, index) => (
            <div
            //Aqui montamos un array para previsualizar las imagenes que enviaremos
              key={index}
              style={{

                position: "relative",
                width: "8rem",
                display: "inline",
                height: "8rem",
              }}
            >
              <img
                src={image}
                alt="Imagen Cargada"
                style={{
                  borderRadius: "1rem",
                  margin: ".5rem",
                  width: "80%",
                  display: "flex",
                  alignContent: "center",
                }}
              />
              <Button
              //boton eliminar img
                variant="danger"
                style={{
                  position: "absolute",
                  top: 0,
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
      )}
    </CloudinaryContext>
  );
};
