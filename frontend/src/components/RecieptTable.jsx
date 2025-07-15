import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
export default function ReceiptTable({ data }) {
  const [receipts, setReceipts] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    let sortedData = [...receipts];

    switch (key) {
      case 'date':
        sortedData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return direction === 'asc' ? dateA - dateB : dateB - dateA;
        });
        break;

      case 'category':
        sortedData.sort((a, b) => {
          const comparison = a.category.localeCompare(b.category);
          return direction === 'asc' ? comparison : -comparison;
        });
        break;

      case 'amount':
        sortedData.sort((a, b) => {
          const amountA =
            a.type === 'expense' ? -Math.abs(a.amount) : Math.abs(a.amount);
          const amountB =
            b.type === 'expense' ? -Math.abs(b.amount) : Math.abs(b.amount);
          return direction === 'asc' ? amountA - amountB : amountB - amountA;
        });
        break;

      default:
        break;
    }

    setReceipts(sortedData);
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <i className='fa-solid fa-sort text-gray-400 ml-1'></i>;
    }
    return sortConfig.direction === 'asc' ? (
      <i className='fa-solid fa-sort-up text-blue-600 ml-1'></i>
    ) : (
      <i className='fa-solid fa-sort-down text-blue-600 ml-1'></i>
    );
  };

  useEffect(() => {
    if (data) {
      setReceipts(data);
    }
  }, [data]);

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Origine</TableHeadCell>
            <TableHeadCell
              className='hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
              onClick={() => handleSort('category')}
            >
              <div className='flex items-center'>
                Categoria
                {getSortIcon('category')}
              </div>
            </TableHeadCell>
            <TableHeadCell
              className='hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
              onClick={() => handleSort('amount')}
            >
              <div className='flex items-center'>
                Quantità
                {getSortIcon('amount')}
              </div>
            </TableHeadCell>
            <TableHeadCell
              className='hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700'
              onClick={() => handleSort('date')}
            >
              <div className='flex items-center'>
                Data
                {getSortIcon('date')}
              </div>
            </TableHeadCell>
            <TableHeadCell>
              <span className='sr-only'>Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className='divide-y'>
          {receipts.map((elem) => {
            return (
              <TableRow
                key={elem.id}
                className='bg-white dark:border-gray-700 dark:bg-gray-800'
              >
                <TableCell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                  {elem.vendor}
                </TableCell>
                <TableCell>{elem.category}</TableCell>
                <TableCell>
                  <span className='px-3'>{elem.amount}</span>
                  {elem.type === 'expense' ? (
                    <span className='text-red-600'>
                      <i className='fa-solid fa-caret-down'></i>
                    </span>
                  ) : (
                    <span className='text-green-600'>
                      <i className='fa-solid fa-caret-up'></i>
                    </span>
                  )}
                </TableCell>
                <TableCell>{elem.date}</TableCell>
                <TableCell>
                  <a
                    href='#'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
