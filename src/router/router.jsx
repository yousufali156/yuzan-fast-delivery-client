import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Pages/Home/Home";
import Services from "../Components/Pages/Services/Services";
import BrandsMarquee from "../Components/Pages/BrandsMarquee/BrandsMarquee";
import WhyWeAreBest from "../Components/Pages/WhyWeAreBest/WhyWeAreBest";
import BeMerchant from "../Components/Pages/Home/BeMerchant/BeMerchant";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/Pages/Authentication/Login/Login";
import Register from "../Components/Pages/Authentication/Register/Register";
import Coverage from "../Components/Pages/Coverage/Coverage";
import SendParcel from "../Components/Pages/SendParcel/SendParcel";
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";
import MyParcels from "../Components/Pages/Dashboard/MyParcels/MyParcels";
import DashboardLayout from "../Layouts/DashboardLayout";
import Payment from "../Components/Pages/Dashboard/Payment/Payment";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "services",
        Component: Services
      },
      {
        path: "brands",
        Component: BrandsMarquee
      },
      {
        path: "why-we-are-best",
        Component: WhyWeAreBest
      },
      {
        path: "be-merchant",
        Component: BeMerchant
      },
      {
        path: "coverage",
        Component: Coverage,

      },
      {
        path: "send-parcel",
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>
      },


      // {
      //   path:"",
      //   Component:
      // },
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path: 'myParcels',
        Component: MyParcels
      },
      {
        path: 'payment/:id',
        Component: Payment
      },
      

    ]

  }
]);