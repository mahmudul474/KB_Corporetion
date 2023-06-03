import { createBrowserRouter } from "react-router-dom";
import Main from "../Layot/Main/Main";
import Home from "../Pages/HomePage/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import ProductDettails from "../Pages/ProductDettails/ProductDettails";
import Action from "../Pages/ActionPage/Action";
import AdminDashBordLayot from "../Pages/AdminDashBord/AdminDashBordLayot/AdminDashBordLayot";
import AdminDashBoard from "../Pages/AdminDashBord/AdminDashbord/AdminDashBoard";
import ProductUploadForm from "../Pages/AdminDashBord/ProductUpload/ProductUploadForm";
import UserDashBord from "../Pages/UserDashBord/UserDashBord";
import Profile from "../Pages/UserDashBord/Profile/Profile";
import MyBidds from "../Pages/UserDashBord/My_Bids/MyBidds";
import WinningBids from "../Pages/UserDashBord/WinningBids/WinningBids";
import Buy from "../Pages/UserDashBord/Buy/Buy";
import Private from "./PraivetRout/Privet";
import ThisWeek from "../Pages/ThisWeekEnd/ThisWeek";
import ThisMonth from "../Pages/ThisMonthEnd/ThisMonth";
import Winers from "../Pages/Winners/Winers";
import Users from "../Pages/AdminDashBord/Users/Users";
import Order from "../Pages/AdminDashBord/Orders/Order";
import Allproducts from "../Pages/AdminDashBord/AllProducts/Allproducts";
import About from "../Pages/About/About";
import AdminProductDettailsCard from "../Pages/AdminDashBord/AllProducts/ProductDettailsCard/AdminProductDettailsCard";

export const routs = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/winners",
        element: <Winers></Winers>
      },
      {
        path: "/my-dashboard",
        element: (
          <Private>
            {" "}
            <UserDashBord></UserDashBord>
          </Private>
        ),
        children: [
          {
            path: "/my-dashboard",
            element: (
              <Private>
                {" "}
                <Profile></Profile>
              </Private>
            )
          },
          {
            path: "/my-dashboard/my-bids",
            element: (
              <Private>
                <MyBidds></MyBidds>
              </Private>
            )
          },
          {
            path: "/my-dashboard/win-bids",
            element: (
              <Private>
                <WinningBids></WinningBids>
              </Private>
            )
          },
          {
            path: "/my-dashboard/buy",
            element: (
              <Private>
                <Buy></Buy>
              </Private>
            )
          }
        ]
      },

      {
        path: "/this-week",
        element: <ThisWeek></ThisWeek>
      },
      {
        path: "/this-month",
        element: <ThisMonth></ThisMonth>
      },
      {
        path: "/others",
        element: <Action></Action>
      },
      {
        path: "/about",
        element: <About></About>
      },

      {
        path: "/action/:id",
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL}/products/${params.id}`),
        element: (
          <Private>
            {" "}
            <ProductDettails></ProductDettails>
          </Private>
        )
      }
    ]
  },
  {
    path: "/admin-dashboard",
    element: (
      <Private>
        {" "}
        <AdminDashBordLayot></AdminDashBordLayot>
      </Private>
    ),
    children: [
      {
        path: "/admin-dashboard",
        element: (
          <Private>
            {" "}
            <AdminDashBoard></AdminDashBoard>
          </Private>
        )
      },
      {
        path: "/admin-dashboard/productUpload",
        element: (
          <Private>
            <ProductUploadForm></ProductUploadForm>
          </Private>
        )
      },
      {
        path: "/admin-dashboard/users",
        element: (
          <Private>
            {" "}
            <Users></Users>
          </Private>
        )
      },
      {
        path: "/admin-dashboard/orders",
        element: (
          <Private>
            {" "}
            <Order></Order>
          </Private>
        )
      },
      {
        path: "/admin-dashboard/products",
        element: <Allproducts></Allproducts>
      },
      {
        path: "/admin-dashboard/action/:id",
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL}/products/${params.id}`),
        element: (
          <Private>
            {" "}
            <AdminProductDettailsCard></AdminProductDettailsCard>
          </Private>
        )
      }
    ]
  }
]);
