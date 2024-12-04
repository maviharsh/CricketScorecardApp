import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@material-tailwind/react";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Form from './Community/Form';
import Form2 from './Community/CoachForm';
import GroundForm from './Community/GroundForm';
import HomePage from './LookingPage/HomePage';
import { InputWithButton } from './Message';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    {/* <Form2 photo={"referee-svgrepo-com.svg"} secondlast={"YOUTUBE LINK"} last={"FACEBOOK LINK"}/> */}
    {/* <Form /> */}
    {/* <HomePage /> */}
    {/* <HomePage /> */}
    <InputWithButton />
    <Footer />
  </React.StrictMode>
);
