import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "@shared/components/Layout";
import { Button } from "react-bootstrap";

export const Thankyou = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <FaShoppingBag size={50} color="#3acf3a" />
        <h2 className="mt-4">Thank You for Shopping with Us!</h2>
        <p>We appreciate your business and hope to see you again soon.</p>
        <Button
          variant="outline-dark"
          onClick={handleContinueShopping}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Continue Shopping
        </Button>
      </div>
    </Layout>
  );
};
