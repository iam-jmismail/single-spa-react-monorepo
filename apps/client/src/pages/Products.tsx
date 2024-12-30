import Layout from "@shared/components/Layout";
import React, { useState } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "react-bootstrap";

type Props = {};

type Product = {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
};

type CartItem = Product & { quantity: number };

const Products = (props: Props) => {
  const productData: Product[] = [
    {
      id: "product-1",
      title: "Product 1",
      price: 29.99,
      currency: "INR",
      description: "This is a description for product 1.",
    },
    {
      id: "product-2",
      title: "Product 2",
      price: 49.99,
      currency: "INR",
      description: "This is a description for product 2.",
    },
    {
      id: "product-3",
      title: "Product 3",
      price: 19.99,
      currency: "INR",
      description: "This is a description for product 3.",
    },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (productId: string) => {
    setCart((prevCart) => {
      const product = productData.find((p) => p.id === productId);
      if (!product) return prevCart;

      const productIndex = prevCart.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[productIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[productIndex].quantity > 1) {
          updatedCart[productIndex].quantity -= 1;
        } else {
          updatedCart.splice(productIndex, 1);
        }
        return updatedCart;
      }
      return prevCart;
    });
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-left mb-4">Products</h2>
        <Row className="g-4">
          {productData.map((product) => (
            <Col md={4} key={product.id}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">{product.title}</Card.Title>
                  <Card.Text className="mb-3">{product.description}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="d-flex justify-content-between">
                      <strong>Price:</strong>
                      <span>
                        {product.price} {product.currency}
                      </span>
                    </ListGroupItem>
                  </ListGroup>

                  {cart.some((item) => item.id === product.id) ? (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Button
                        variant="outline-dark"
                        onClick={() => handleRemoveFromCart(product.id)}
                        size="sm"
                      >
                        -
                      </Button>
                      <span>
                        {cart.find((item) => item.id === product.id)?.quantity}
                      </span>
                      <Button
                        variant="outline-dark"
                        onClick={() => handleAddToCart(product.id)}
                        size="sm"
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="dark"
                      className="w-100 mt-3"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Products;
