import { createContext, useState, useContext } from 'react';

const toastContext = createContext();

function ToastProvider({ children }) {
  const [status, setStatus] = useState(false);
  return (
    <toastContext.Provider value={{ status, setStatus }}>
      {children}
    </toastContext.Provider>
  );
}
function useToastContext() {
  const context = useContext(toastContext);
  return context;
}
export { ToastProvider, useToastContext };
