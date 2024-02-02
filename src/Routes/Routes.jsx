import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import AddBlog from "../pages/AddBlog/AddBlog";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import AllBlogs from "../pages/AllBlogs/AllBlogs";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import FeatureBlog from "../pages/FeatureBlog/FeatureBlog";
import Wishlist from "../pages/Wishlist/Wishlist";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-blog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "/update-blog/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://blog-server-beige.vercel.app/v1/blog-details/${params.id}`
          ),
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails></BlogDetails>,
        loader: ({ params }) =>
          fetch(
            `https://blog-server-beige.vercel.app/v1/blog-details/${params.id}`,
            {
              credentials: "include",
            }
          ),
      },
      {
        path: "/features",
        element: <FeatureBlog></FeatureBlog>,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
