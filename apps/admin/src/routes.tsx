import { createBrowserRouter } from "react-router-dom";
import Login from "@shared/components/Login";
import { Orders } from "./pages/Orders";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
  ],
  {
    basename: "/admin",
  }
);
