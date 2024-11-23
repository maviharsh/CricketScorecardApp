import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@material-tailwind/react";
import Header from './LandingPage/Header';
import Footer from './LandingPage/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    
    <Footer />
  </React.StrictMode>
);
