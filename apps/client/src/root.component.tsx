import "core-js/stable";
import "regenerator-runtime/runtime";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function Root(props) {
  return <RouterProvider router={router} />;
}
