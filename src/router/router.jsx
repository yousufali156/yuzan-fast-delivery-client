import {createBrowserRouter} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Components/Pages/Home/Home";
import Services from "../Components/Pages/Services/Services";
import BrandsMarquee from "../Components/Pages/BrandsMarquee/BrandsMarquee";
import WhyWeAreBest from "../Components/Pages/WhyWeAreBest/WhyWeAreBest";
import BeMerchant from "../Components/Pages/Home/BeMerchant/BeMerchant";




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
      }
    ]
  }
]);