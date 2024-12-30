import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products";
import Login from "@shared/components/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Products />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ],
  {
    basename: "/app",
  }
);
