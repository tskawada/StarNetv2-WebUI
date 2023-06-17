import axios from 'axios';
import FormData from 'form-data';

export const uploadFile = async (file: File) => {
  const url = 'http://localhost:8080/upload';

  const formData = new FormData();
  formData.append('file', file, 'file.tiff');

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'arraybuffer',
    });

    const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};

export const starless = async (stride: number) => {
  const url = 'http://localhost:8080/starless';

  try {
    const response = await axios.get(url, {
      params: {
        stride: stride,
      },
      headers: {
        'accept': 'application/json',
      },
      responseType: 'arraybuffer',
    });
    
    const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
  } catch (error) {
    console.error(error);
  }
};

export const download = async () => {
  const url = 'http://localhost:8080/download';

  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
      },
      responseType: 'arraybuffer',
    });

    const imageBlob = new Blob([response.data], { type: 'image/tiff' });
    const imageUrl = URL.createObjectURL(imageBlob);

    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};