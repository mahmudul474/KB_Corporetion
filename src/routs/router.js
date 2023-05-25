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
        path: "/my-dashboard",
        element: <UserDashBord></UserDashBord>,
        children:[
          {
            path:"/my-dashboard",
            element:<Profile></Profile>
             },
             {
              path:"/my-dashboard/my-bids",
              element:<MyBidds></MyBidds>
               },
               {
                path:"/my-dashboard/win-bids",
                element:<WinningBids></WinningBids>
              },
              {
                path:"/my-dashboard/buy",
                element:<Buy></Buy>
              },
        ]
      },
      
     
      
      

      {
        path: "/action",
        element: <Action></Action>
      },
      {
        path: "/action/:id",
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_API_URL}/products/${params.id}`),
        element: <ProductDettails></ProductDettails>
      }
    ]
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashBordLayot></AdminDashBordLayot>,
    children: [
      {
        path: "/admin-dashboard",
        element: <AdminDashBoard></AdminDashBoard>
      },
      {
        path: "/admin-dashboard/productUpload",
        element: <ProductUploadForm></ProductUploadForm>
      }
    ]
  }
]);