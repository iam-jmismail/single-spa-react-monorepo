import "core-js/stable";
import { RouterProvider } from "react-router-dom";
import "regenerator-runtime/runtime";
import { router } from "./routes";
import { AuthProvider } from "@shared/context/AuthContext";
import { ToastContainer } from "react-toastify";

export default function Root() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
