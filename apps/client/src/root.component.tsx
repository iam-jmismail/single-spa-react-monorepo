import "core-js/stable";
import "regenerator-runtime/runtime";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";

export default function Root(props) {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
