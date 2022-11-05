import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Main from './layouts/Main';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { productsAndCartLoader } from './loaders/productsAndCartLoader';
import Login from './components/Login/Login';
import SignUP from './components/SignUp/SignUP';
import Shipping from './components/Shipping/Shipping';
import PriviteRoute from './components/PriviteRoute/PriviteRoute';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: () => fetch('http://localhost:5000/products'),
          element: <Shop></Shop>
        },
        {
          path: 'orders',
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: 'inventory',
          element: <PriviteRoute><Inventory></Inventory></PriviteRoute>
        },
        {
          path: 'shipping',
          element: <PriviteRoute><Shipping /></PriviteRoute>
        },
        {
          path: 'about',
          element: <About></About>
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <SignUP />
        }
      ]
    },

  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
