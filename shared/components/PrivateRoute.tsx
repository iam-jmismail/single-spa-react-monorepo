import { useAuth } from "@apps/client/src/context/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <> {children} </>
      ) : (
        <>
          <Navigate to={"/login"} />
        </>
      )}
    </>
  );
};

export default PrivateRoute;
