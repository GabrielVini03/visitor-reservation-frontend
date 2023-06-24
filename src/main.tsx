import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { VisitorProvider } from './contexts/VisitorContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VisitorProvider>
      <App />
    </VisitorProvider>
  </React.StrictMode>
);
