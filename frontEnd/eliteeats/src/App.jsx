 import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./components/admin/Login";
import Dashboard from "./components/admin/dashboard";
import Customers from "./components/admin/Customers";
import Restaurents from "./components/admin/Restaurents";
import Riders from "./components/admin/Riders";
import Registration from "./components/user/Registration";
import Otp from "./components/otp/Otp";
import Home from "./components/user/Home";
import UserLogin from "./components/user/UserLogin";

import RiderRoutes from "./components/rider/RiderRoutes";


function App() {
  const router = createBrowserRouter([
    //user side routes

    {path:"/userSignup",element:<Registration/>},
    {path:"/otp",element:<Otp/>},
    {path:"/userLogin",element:<UserLogin/>},
    {path:"/home",element:<Home/>},

    //admin side routes
    {path: "/login", element: <Login /> },
    {path:"/dashboard",element:<Dashboard/>},
    {path:"/customers",element:<Customers/>},
    {path:"/restaurents",element:<Restaurents/>},
    {path:"/delivery_partners",element:<Riders/>},
    
   ...RiderRoutes
  

   
  ]);

  return <RouterProvider router={router} />;
}

export default App;
