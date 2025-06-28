import { useState } from 'react';
import axios from '../../api/axios';
import { Button, Card } from 'flowbite-react';
import TransactionsChart from '../components/TransactionsChart';
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
    <Card className='max-w-sm'>
      <TransactionsChart></TransactionsChart>
    </Card>
  );
}
