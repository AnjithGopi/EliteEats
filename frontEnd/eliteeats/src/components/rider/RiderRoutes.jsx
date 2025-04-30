
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Otp from "./Otp"

const riderRoutes=[
    
    { path: "/rider/Home", element: <Home /> },
    { path: "/rider/login", element: <Login /> },
    {path:"/rider/signup",element:<Signup/>},
    {path:"/rider/otp",element:<Otp/>}

]


export default riderRoutes