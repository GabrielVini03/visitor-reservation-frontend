import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { VisitorProvider } from './contexts/VisitorContext';
import { VisitorServiceContextProvider } from './service/apiService';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VisitorProvider>
      <VisitorServiceContextProvider>
        <App />
      </VisitorServiceContextProvider>
    </VisitorProvider>
  </React.StrictMode>
);
