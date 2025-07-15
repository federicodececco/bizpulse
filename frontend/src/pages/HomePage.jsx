import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../../api/axios';
import { Button, Card } from 'flowbite-react';
import TransactionsChart from '../components/TransactionsChart';
export default function HomePage() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get('api/transaction/');
      if (res.status === 200) {
        setData(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error('error while fetching data', err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-3 gap-6 mt-4 mr-4'>
      <Card className='  max-h-100'>
        <TransactionsChart data={data} type={'area'}></TransactionsChart>
      </Card>
      <Card className=' max-h-100 '>
        <TransactionsChart data={data} type={'doughnut'}></TransactionsChart>
      </Card>
    </div>
  );
}
