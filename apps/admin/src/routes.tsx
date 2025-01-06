import { createBrowserRouter } from "react-router-dom";
import Login from "@shared/components/Login";
import { Orders } from "./pages/Orders";
import { Products } from "./pages/Products";
import { ProductProvider } from "./context/ProductContext";
import Dashboard from "./pages/Dashboard";

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
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/products",
      element: (
        <ProductProvider>
          <Products />
        </ProductProvider>
      ),
    },
  ],
  {
    basename: "/admin",
  }
);
