import Layout from "@shared/components/Layout";
import { Toast } from "@shared/utils/toast";
import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Alert,
  Form,
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

const Cart = (props: Props) => {
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

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "product-1",
      title: "Product 1",
      price: 29.99,
      currency: "INR",
      description: "This is a description for product 1.",
      quantity: 1,
    },
    {
      id: "product-2",
      title: "Product 2",
      price: 49.99,
      currency: "INR",
      description: "This is a description for product 2.",
      quantity: 2,
    },
  ]);

  const handleAddToCart = (productId: string) => {
    setCart((prevCart) => {
      const product = prevCart.find((p) => p.id === productId);
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

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const shipping = 5.0;
  const tax = 0.1;

  const getTotalWithShippingAndTax = () => {
    const subtotal = getTotal();
    const totalTax = subtotal * tax;
    return subtotal + shipping + totalTax;
  };

  const handleCheckOut = () => {
    Toast.success("Order Placed");
    setCart([]);
  };

  return (
    <Layout>
      <Container className="mt-4">
        <h2 className="text-left mb-4">Cart</h2>
        {cart.length === 0 ? (
          <Alert variant="info" className="text-center">
            Your cart is empty
          </Alert>
        ) : (
          <Row>
            <Col md={8}>
              <ListGroup>
                {cart.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={8}>
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <p>
                          <strong>Price:</strong> {item.price} {item.currency}
                        </p>
                      </Col>
                      <Col md={4} className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              setCart((prevCart) =>
                                prevCart.map((cartItem) =>
                                  cartItem.id === item.id
                                    ? {
                                        ...cartItem,
                                        quantity: Math.max(
                                          1,
                                          parseInt(e.target.value)
                                        ),
                                      }
                                    : cartItem
                                )
                              )
                            }
                            style={{ width: "60px", margin: "0 10px" }}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col md={4}>
              <ListGroup>
                <ListGroupItem>
                  <strong>Items in Cart:</strong> {cart.length}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Sub Total:</strong> {getTotal().toFixed(2)}{" "}
                  {cart[0]?.currency}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Shipping:</strong> {shipping.toFixed(2)}{" "}
                  {cart[0]?.currency}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Tax:</strong> {(getTotal() * tax).toFixed(2)}{" "}
                  {cart[0]?.currency}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Total:</strong>{" "}
                  {getTotalWithShippingAndTax().toFixed(2)} {cart[0]?.currency}
                </ListGroupItem>
                <ListGroupItem className="text-center">
                  <Button
                    variant="dark"
                    className="w-100"
                    onClick={handleCheckOut}
                  >
                    Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
};

export default Cart;
