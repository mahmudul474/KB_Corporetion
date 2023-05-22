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
    path: "/adminDashboard",
    element: <AdminDashBordLayot></AdminDashBordLayot>,
    children: [
      {
        path: "/adminDashboard",
        element: <AdminDashBoard></AdminDashBoard>
      },
      {
        path: "/adminDashboard/productUpload",
        element: <ProductUploadForm></ProductUploadForm>
      }
    ]
  }
]);