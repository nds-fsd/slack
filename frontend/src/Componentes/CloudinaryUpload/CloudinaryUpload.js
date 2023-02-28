import { CloudinaryContext } from 'cloudinary-react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineUpload } from "react-icons/ai";

export const CloudinaryUpload = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const url = 'https://api.cloudinary.com/v1_1/dnsy1t6dj/auto/upload';

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const uploadedImages = [];
    const previewedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'w6v9atp0');
      const options = {method: 'POST', body: formData};
      const response = await fetch(url, options);
      const json = await response.json();
      uploadedImages.push(json.secure_url);
      const imageURL = URL.createObjectURL(file);
      previewedImages.push(imageURL);
    }

    setImages([...images, ...uploadedImages]);
    setPreviewImages([...previewImages, ...previewedImages]);
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    const newPreviewImages = [...previewImages];
    newImages.splice(index, 1);
    newPreviewImages.splice(index, 1);
    setImages(newImages);
    setPreviewImages(newPreviewImages);
  };

  return (
    <CloudinaryContext
      cloudName='dnsy1t6dj'
      apiKey='573675825162776'
      apiSecret='Q71fKH8AO31JQ-AILjoJx344_Eg'
      secure={true}
    >
      <div>
        <Button variant='dark' size='sm'
        style={{
                margin: '1rem'
              }}>
          <label htmlFor='image-upload'><AiOutlineUpload/></label>
          <input
            type='file'
            id='image-upload'
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            multiple
          />
        </Button>
      </div>
      <div>
        {previewImages.map((image, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img src={image} alt='Imagen Cargada' />
            <button
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
              onClick={() => handleImageRemove(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </CloudinaryContext>
  );
};
