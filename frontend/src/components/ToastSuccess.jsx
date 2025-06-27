import { Toast, ToastToggle } from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';
import { useEffect } from 'react';
import { useToastContext } from '../contexts/ToastContext';

export default function ToastSucess() {
  const { status, setStatus } = useToastContext();
  useEffect(() => {
    if (status) {
      const time = setTimeout(() => setStatus(false), 2500);
      return () => clearTimeout(time);
    }
  }, [status, setStatus]);
  return (
    <div
      className={`absolute z-50 top-5 right-[50%] translate-x-1/2  transition-opacity duration-500 outline outline-white
        ${status ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <Toast>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'>
          <HiCheck className='h-5 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal'>Item moved successfully.</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}
