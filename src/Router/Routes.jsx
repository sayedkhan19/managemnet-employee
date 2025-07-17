import {
  createBrowserRouter,
  } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../Pageses/Home-Pageses/Home";
import ErrorPage from "../Pageses/Error/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pageses/Authentiation/Login";
import Register from "../Pageses/Authentiation/Register";
import AboutUs from "../Pageses/Home-Pageses/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
        {
            index: true,
            Component: Home,
        },
        {
            path:"/about",
            Component:AboutUs,
        }
    ]
  },
  
  {
    path:'/',
    Component: AuthLayout,
    children: [
        {
            path: "login",
            Component: Login,
        },
        {
            path: "register",
            Component: Register,
        }
    ]
  }
]);