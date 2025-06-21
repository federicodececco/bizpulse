import { BrowserRouter, Route, Routes } from 'react-router';

/* pages */
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/' element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
