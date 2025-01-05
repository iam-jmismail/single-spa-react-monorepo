import { Toast } from "@shared/utils/toast";
import {
  Button,
  Col,
  Row,
  Container,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import Header from "@shared/components/Header";
import { IAddOrderReqBody, OrderFactory } from "@shared/factories/OrderFactory";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";
import { useAuth } from "@shared/context/AuthContext";

type Props = {};

const Cart = (props: Props) => {
  const { cart: prevCart, updateCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (productId: string) => {
    const product = prevCart.find((p) => p._id === productId);
    if (!product) return prevCart;

    const productIndex = prevCart.findIndex((item) => item._id === productId);

    if (productIndex !== -1) {
      const updatedCart = [...prevCart];
      updatedCart[productIndex].quantity += 1;
      updateCart(updatedCart);
    } else {
      updateCart([...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const productIndex = prevCart.findIndex((item) => item._id === productId);
    if (productIndex !== -1) {
      const updatedCart = [...prevCart];
      if (updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1;
      } else {
        updatedCart.splice(productIndex, 1);
      }
      return updateCart(updatedCart);
    }
    return updateCart(prevCart);
  };

  const getTotal = () => {
    return prevCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const shipping = 5.0;
  const tax = 0.1;

  const getTotalWithShippingAndTax = () => {
    const subtotal = getTotal();
    const totalTax = subtotal * tax;
    return subtotal + shipping + totalTax;
  };

  const handleCheckOut = async () => {
    const cartItems = [...prevCart];
    const products: IAddOrderReqBody["products"] = cartItems.map(
      ({ _id, quantity }) => ({
        productId: _id,
        quantity,
      })
    );

    await OrderFactory.placeOrder({ products });
    Toast.success("Order placed successfully");
    navigate("/success");
    updateCart([]);
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        {prevCart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <h2 className="text-left mb-4">Cart</h2>
            <Row>
              <Col md={8}>
                <ListGroup>
                  {prevCart.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={8}>
                          <h5>{item.name}</h5>
                          <p>{item.description}</p>
                          <p>
                            <strong>Price:</strong> {item.price} {item.currency}
                          </p>
                        </Col>
                        <Col md={4} className="d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              onClick={() => handleRemoveFromCart(item._id)}
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCart(
                                  prevCart.map((cartItem) =>
                                    cartItem._id === item._id
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
                              onClick={() => handleAddToCart(item._id)}
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
                    <strong>Items in Cart:</strong> {prevCart.length}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Sub Total:</strong> {getTotal().toFixed(2)}{" "}
                    {prevCart[0]?.currency}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Shipping:</strong> {shipping.toFixed(2)}{" "}
                    {prevCart[0]?.currency}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Tax:</strong> {(getTotal() * tax).toFixed(2)}{" "}
                    {prevCart[0]?.currency}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Total:</strong>{" "}
                    {getTotalWithShippingAndTax().toFixed(2)}{" "}
                    {prevCart[0]?.currency}
                  </ListGroupItem>
                  <ListGroupItem className="text-center">
                    <Button
                      variant="dark"
                      className="w-100"
                      onClick={handleCheckOut}
                      disabled={!isAuthenticated}
                    >
                      Checkout
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
