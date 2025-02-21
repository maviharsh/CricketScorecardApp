import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@material-tailwind/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from './routes';

const router = createBrowserRouter(routes);

// Create Auth Context
export const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
