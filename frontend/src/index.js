import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@material-tailwind/react";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import HomePage from './Community/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <HomePage />    
    <Footer />
  </React.StrictMode>
);
