import { useState } from 'react';
import axios from '../../api/axios';
export default function HomePage() {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File caricato con successo!', res.data);
    } catch (error) {
      console.error("Errore durante l'upload:", error);
    }
  };
  return (
    <div>
      <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Receipt</button>
    </div>
  );
}
