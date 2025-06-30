import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import AreaChart from './AreaChart';
export default function TransactionsChart() {
  const [transactionsData, setTransactionsData] = useState([]);
  const [chartData, setChartData] = useState([]);

  /* fetching */
  const fetchData = async () => {
    try {
      const res = await axios.get('api/transaction/');
      if (res.status === 200) {
        setTransactionsData(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.error('error while fetching data', err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  /* compile data to ease the chart rendering */
  const compileData = () => {
    let newArr = transactionsData.map((elem) => {
      return {
        amount: elem.amount,
        vendor: elem.vendor,
        category: elem.category,
        type: elem.type,
        date: elem.date,
      };
    });
    setChartData(newArr);
  };
  useEffect(() => {
    compileData();
    console.log(chartData);
  }, [transactionsData]);

  return (
    <div className='h-90 w-90   '>
      <AreaChart externalData={chartData} />
    </div>
  );
}
