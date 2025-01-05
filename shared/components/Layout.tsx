import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

type Props = {
  children: React.ReactNode;
  isAdmin?: boolean | undefined;
};

const Layout = ({ children, isAdmin = false }: Props) => {
  return (
    <div>
      {isAdmin ? <Header /> : <AdminHeader />}
      <Container className="my-4">{children}</Container>
    </div>
  );
};

export default Layout;
