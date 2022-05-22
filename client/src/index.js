import React from 'react';
import ReactDOM from 'react-dom/client';
import './styleSheets/index.css';
import './styleSheets/App.css';
import './styleSheets/CompStyles.css';
import './styleSheets/DayNight.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);