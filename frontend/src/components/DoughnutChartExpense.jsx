import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function DoughnutChartExpense({ externalData }) {
  let categoriesArr = externalData.reduce((acc, elem) => {
    if (!acc.includes(elem.category)) {
      acc.push(elem.category);
    }
    return acc;
  }, []);

  /**
   *function that takes an array  of categories and a dataset, returning an array of category and
   *total expenses for each one
   *@var {object} dataset: array of data
   *@var {categories} categoires : array of categories
   *@returns {object} array of objects couples [category,sum]
   **/
  const extractData = (dataset, categories) => {
    const expenses = dataset.filter((elem) => elem.type === 'expense');
    const categoryTotals = expenses.reduce((acc, expense) => {
      const cat = expense.category;
      acc[cat] = (acc[cat] || 0) + expense.amount;
      return acc;
    }, {});
    return Object.entries(categoryTotals).map(([category, sum]) => ({
      category,
      sum,
    }));
  };
  /**
   * function that given the data and categories, returns
   * the sum of the top 4 expenses divided by categories,
   * grouping the other expenses in another category "other"
   *
   * @var {object}dataset: array of data
   * @var {object} categoires:  array of categories
   * @returns {object} result: array of compiled data [{category:String,sum:Number}]
   *
   *
   * **/
  const filterMajorExpenses = (dataset, categories) => {
    const data = extractData(dataset, categories);

    const sortedData = data.sort((a, b) => b.sum - a.sum);

    const topFour = sortedData.slice(0, 4);
    const otherSum = sortedData
      .slice(4)
      .reduce((total, item) => total + item.sum, 0);

    const result = [...topFour];

    if (otherSum > 0) {
      result.push({ category: 'altre', sum: otherSum });
    }

    while (result.length < 4) {
      result.push({ category: '', sum: 0 });
    }

    return result;
  };

  const finalData = filterMajorExpenses(externalData, categoriesArr);

  const chartData = {
    labels: finalData.map((item) => item.category).filter((cat) => cat !== ''),
    datasets: [
      {
        data: finalData.map((item) => item.sum).filter((sum) => sum > 0),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}
