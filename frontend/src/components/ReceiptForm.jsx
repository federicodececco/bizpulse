import { Button, Radio, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router';
import axios from '../../api/axios';
import { useState } from 'react';
import { useToastContext } from '../contexts/ToastContext';
export default function ReceiptForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    vendor: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { status, setStatus } = useToastContext();

  const handleFieldChange = (elem) => {
    const { name, value } = elem.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const transactionFinalData = {
        amount: parseFloat(formData.amount),
        category: formData.category,
        vendor: formData.vendor,
        type: formData.type,
        date: formData.date,
      };

      const res = await axios.post('api/transaction/', transactionFinalData);

      if (res.status >= 200 && res.status < 300) {
        setFormData({
          amount: '',
          category: '',
          vendor: '',
          type: '',
          date: new Date().toISOString().split('T')[0],
        });
        /* trigger toast */
        setStatus(true);
      }
    } catch (err) {
      console.error('erprre brutto', err);
      setError('Errore nella creazione della transazioen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='flex max-w-md flex-col gap-4' onSubmit={handleSubmit}>
      {error && <div className='text-red-500 text-sm mb-2'>{error}</div>}

      <div>
        <div className='mb-2 block'>
          <Label htmlFor='amount'>Valore</Label>
        </div>
        <TextInput
          id='amount'
          name='amount'
          type='number'
          step='0.01'
          placeholder='0.00'
          value={formData.amount}
          onChange={handleFieldChange}
          required
          shadow
        />
      </div>

      <div>
        <div className='mb-2 block'>
          <Label htmlFor='category'>Categoria</Label>
        </div>
        <TextInput
          id='category'
          name='category'
          type='text'
          value={formData.category}
          onChange={handleFieldChange}
          required
          shadow
        />
      </div>

      <div>
        <div className='mb-2 block'>
          <Label htmlFor='vendor'>Venditore</Label>
        </div>
        <TextInput
          id='vendor'
          name='vendor'
          type='text'
          value={formData.vendor}
          onChange={handleFieldChange}
          required
          shadow
        />
      </div>

      <div>
        <div className='mb-2 block'>
          <Label htmlFor='type'>Tipologia</Label>
        </div>
        <div className='flex max-w-md flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Radio
              id='expense'
              name='type'
              value='expense'
              onChange={handleFieldChange}
              defaultChecked
            />
            <Label htmlFor='expense'>spesa</Label>
          </div>
          <div className='flex items-center gap-2'>
            <Radio
              id='income'
              name='type'
              value='income'
              onChange={handleFieldChange}
            />
            <Label htmlFor='income'>entrata</Label>
          </div>
        </div>
      </div>

      <div>
        <div className='mb-2 block'>
          <Label htmlFor='date'>Data</Label>
        </div>
        <TextInput
          id='date'
          name='date'
          type='date'
          value={formData.date}
          onChange={handleFieldChange}
          required
          shadow
        />
      </div>

      <Button type='submit' disabled={loading}>
        {loading ? 'In corso...' : 'Aggiungi Transazione'}
      </Button>
    </form>
  );
}
