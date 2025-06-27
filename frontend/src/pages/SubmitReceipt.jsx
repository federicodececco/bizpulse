import ReceiptForm from '../components/ReceiptForm';
import ToastSuccess from '../components/ToastSuccess';
export default function SubmitReceipt() {
  return (
    <>
      <ToastSuccess></ToastSuccess>
      <ReceiptForm />
    </>
  );
}
