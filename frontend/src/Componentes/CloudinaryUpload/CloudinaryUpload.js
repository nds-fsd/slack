import { CloudinaryContext } from 'cloudinary-react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

export const CloudinaryUpload = () => {
  const [image, setImage] = useState('');
  const url = 'https://api.cloudinary.com/v1_1/dnsy1t6dj/auto/upload'

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'w6v9atp0');
    const options = {method: 'POST', body: formData};
    const response = await fetch(url, options);
    const json = await response.json();
    setImage(json.secure_url);
  };

  return (
    <CloudinaryContext
      cloudName='dnsy1t6dj'
      apiKey='573675825162776'
      apiSecret='Q71fKH8AO31JQ-AILjoJx344_Eg'
      secure={true}
    >
      <div>
        <Button variant='dark' size='sm'><input type='file' onChange={handleImageUpload} /></Button>
      </div>
    </CloudinaryContext>
  );
}
