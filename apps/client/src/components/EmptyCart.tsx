import React from "react";
import { Button } from "react-bootstrap";
import { FaRegSadCry } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        color: "#555",
      }}
    >
      <FaRegSadCry size={60} color="#000000" />
      <h2>Your cart is empty</h2>
      <p>It looks like you haven't added anything to your cart yet.</p>
      <Button variant="outline-dark" onClick={handleContinueShopping}>
        Continue Shopping
      </Button>
    </div>
  );
};

export default EmptyCart;
