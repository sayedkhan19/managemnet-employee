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
import ContactUs from "../Pageses/Home-Pageses/ContactUs";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../layouts/DashBoard layout/DashboardLayout";
import DashboardHome from "../layouts/DashBoard layout/DashboardHome";
import WorkSheet from "../layouts/DashBoard layout/employee/WorkSheet";
import Profile from "../layouts/DashBoard layout/Profile";

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
        },
        {
          path:"/contact",
          Component:ContactUs,
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
  },
  {
    path : "/dashboard",
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        index : true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path: "work",
        element: <WorkSheet></WorkSheet>
      },
      {
        path:"profile",
        element: <Profile></Profile>,
      }
    ]
  },
]);