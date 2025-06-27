import { BrowserRouter, Route, Routes } from 'react-router';
import {
  Button,
  MegaMenu,
  MegaMenuDropdown,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';

/* pages */
import HomePage from './pages/HomePage';
import DefaultLayout from './layout/DefaultLayout';
import SubmitReceipt from './pages/SubmitReceipt';

/* context */
import { ToastProvider } from './contexts/ToastContext';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/submitReceipt' element={<SubmitReceipt />} />
            </Route>
          </Routes>
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}
