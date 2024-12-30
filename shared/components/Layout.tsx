import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <Container className="my-4">{children}</Container>
    </div>
  );
};

export default Layout;
