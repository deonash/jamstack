import { useState } from 'react';

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', await imageToBase64(image));

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  const imageToBase64 = (file: File) => new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });

  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setImage(files[0]);
          }
        }} 
      />
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
} 