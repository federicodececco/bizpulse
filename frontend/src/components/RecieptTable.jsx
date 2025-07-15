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
            <TableHeadCell>Categoria</TableHeadCell>
            <TableHeadCell>Quantità</TableHeadCell>
            <TableHeadCell>Data</TableHeadCell>
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
