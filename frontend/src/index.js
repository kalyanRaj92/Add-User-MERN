import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from 'react-hot-toast'
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Toaster position="top-center" toastOptions={{duration:5000}}/>
  </React.StrictMode>
);

