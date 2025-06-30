import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  plugins,
  scales,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Entrate/Uscite',
    },
  },

  scales: {
    y: {
      beginAtZero: true,
      grace: '10%',
      ticks: {
        maxTicksLimit: 12,
        stepSize: undefined,
        callback: function (value) {
          if (value >= 1000) {
            return '€' + (value / 1000).toFixed(1) + 'k';
          }
          return '€' + value.toLocaleString('it-IT');
        },
      },
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  elements: {
    line: {
      tension: 0.3,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
};

const labels = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

export default function AreaChart({ externalData }) {
  const month = new Date().getMonth();
  const actualLabels = labels.filter((elem, index) => index <= month);

  /**
   * function that takes datasets and type as input returning an array
   * of transaction divided by month
   *
   *
   *@var {String} type :string of searched value, in this case income or expesnse
   *@var {object} datasets : array of data
   *@returns {object} datasets: array of types of transaction, divided by month
   * */
  const extractData = (datasets, type) => {
    return labels.map((elem, monthIndex) => {
      const total = datasets
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          const transactionMonth = transactionDate.getMonth();

          return transactionMonth === monthIndex && transaction.type === type;
        })
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      return type === 'expense' ? -total : total;
    });
  };

  /**
   * takes an array of income and expenses as input returing the net
   *
   * @var {array} datasets: datasets of expense + income
   * @returns {Array} sum of the expenses and incomes
   */
  const net = (datasets) => {
    const incomeData = extractData(datasets, 'income');
    const expenseData = extractData(datasets, 'expense');

    return incomeData.map((elem, index) => {
      return elem + expenseData[index];
    });
  };

  const datasets = [
    {
      fill: 'origin',
      label: 'Entrate',
      data: extractData(externalData, 'income'),
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(34, 197, 94)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      fill: 'origin',
      label: 'Spese',
      data: extractData(externalData, 'expense'),
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderWidth: 2,
      pointBackgroundColor: 'rgb(239, 68, 68)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      fill: false,
      label: 'Bilancio Netto',
      data: net(externalData),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'transparent',
      borderWidth: 3,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      borderDash: [0],
      order: 1,
      tension: 0.1,
    },
  ];
  const chartData = {
    labels: actualLabels,
    datasets: datasets,
  };

  return <Line options={options} data={chartData} className='' />;
}
