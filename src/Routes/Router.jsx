import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layout/Root";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "../providers/PrivateRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/DashBoard/Cart/Cart";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "menu",
                element: <Menu></Menu>
            },
            {
                path: "order/:category",
                element: <Order></Order>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <Signup></Signup>
            },
            {
                path: "secret",
                element: <PrivateRoute><Secret></Secret></PrivateRoute>
            }

        ]
    },
    {
        path: "dashboard",
        element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children : [
            {
                path : "cart",
                element: <Cart></Cart>
            },
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            }
        ]
        
    }
]);

export default router;