import ReceiptForm from '../components/ReceiptForm';
import FileSubmit from '../components/FileSubmit';
import ToastSuccess from '../components/ToastSuccess';
export default function SubmitReceipt() {
  return (
    <>
      <ToastSuccess></ToastSuccess>
      <div className='grid grid-cols-8 gap-4 mr-6  pt-4'>
        <div className='col-span-3'>
          <ReceiptForm />
        </div>
        <div>
          <span></span>
        </div>
        <div className='col-start-6 col-span-3'>
          <FileSubmit></FileSubmit>
        </div>
      </div>
    </>
  );
}
