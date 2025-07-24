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
import EmployeeAll from "../layouts/DashBoard layout/hr/EmployeeAll";
import Payment from "../layouts/DashBoard layout/admin/Payments/Payment";
import PaySalary from "../layouts/DashBoard layout/admin/PaySalary";
import EmployeeDetails from "../layouts/DashBoard layout/hr/EmployeeDetails";
import SalaryInfoAll from "../layouts/DashBoard layout/admin/SalaryInfoAll";
import MyPaymentHistory from "../layouts/DashBoard layout/employee/MyPaymentHistory";
import VerifiedHRList from "../layouts/DashBoard layout/admin/VerifiedHRList";
import Progress from "../layouts/DashBoard layout/hr/Progress";
import AdminManager from "../layouts/DashBoard layout/admin/AdminManager";

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
      },
      {
        path: "employee",
        element: <EmployeeAll></EmployeeAll>
      },
      {
        path: 'payment',
        element: <Payment></Payment>,

      },
      {
        path: "pay-salary/:Idsalary",
        element: <PaySalary></PaySalary>,
      },
      {
        path: "employee-details/:id",
        element: <EmployeeDetails></EmployeeDetails>
      },
      {
        path: 'salary',
        element: <SalaryInfoAll></SalaryInfoAll>
      },
      {
        path : "my-payments",
        element: <MyPaymentHistory></MyPaymentHistory>,
      },
      {
        path: "verified-hrs",
        element: <VerifiedHRList></VerifiedHRList>
      },
      {
        path: 'progress',
        element: <Progress></Progress>
      },
      {
        path: "AdminManager",
        element: <AdminManager></AdminManager>
      }
    ]
  },
]);