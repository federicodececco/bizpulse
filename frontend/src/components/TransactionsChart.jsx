import axios from '../../api/axios';
import { useEffect, useState } from 'react';
import AreaChart from './AreaChart';
import DoughnutChartExpense from './DoughnutChartExpense';
export default function TransactionsChart({ data, type }) {
  const [transactionsData, setTransactionsData] = useState([]);
  const [chartData, setChartData] = useState([data]);

  useEffect(() => {
    setTransactionsData(data || []);
  }, [data]);

  /* compile data to ease the chart rendering */
  const compileData = () => {
    let newArr = transactionsData.map((elem) => {
      return {
        id: elem.id,
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
  }, [transactionsData]);

  return (
    <>
      <div className='mx-auto '>
        {type === 'area' ? (
          <div className='h-90 max-w-90  '>
            <AreaChart externalData={chartData} />
          </div>
        ) : (
          ''
        )}

        {type === 'doughnut' ? (
          <div className='h-90 max-w-90   '>
            <DoughnutChartExpense externalData={chartData} />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
