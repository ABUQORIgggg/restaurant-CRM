import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/ErrorPage.jsx';
import { Provider } from 'react-redux';
import Users from './pages/Users.jsx';
import Home from './pages/Home.jsx';
import store from './redux/store.js';
import Products from './pages/Products.jsx';
import WorkersLogin from './components/WorkersLogin.jsx';
import Sidebar from './components/Sidebar.jsx';
import MyOrders from './components/MyOrders.jsx';
import Menu from './components/Menu.jsx';
import Reservation from './components/Reservation.jsx';


const router = createBrowserRouter([

  


  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/reservation",
        element: <Reservation/>
      },
      

      
      {
        path: "/products",
        element: <Products/>
      },
      {
        path: "/myorders",
        element: <MyOrders/>
      },
     {
        path: '/menu',
        element: <Menu/>
      }
    ]
  },
  {
    path: "/workersLogin",
    element: <WorkersLogin/>
  },

  {
    path: "/Home",
     element: <Home />
  },
  {
    path: "/workers-login",
    element: <WorkersLogin/>
  },
  {
    path: "/Sideber",
    element: <Sidebar/>
  },
  {
    path: "/MyOrders",
    element:<MyOrders/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
