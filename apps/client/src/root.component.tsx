import "core-js/stable";
import "regenerator-runtime/runtime";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

export default function Root(props) {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
