import Layout from "@shared/components/Layout";
import { IProduct, ProductFactory } from "@shared/factories/ProductFactory";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

type Props = {};

type CartItem = IProduct & { quantity: number };

const Products = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { updateCart, cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          status,
          data: { data },
        } = await ProductFactory.getProducts();
        if (status === 200) {
          setProducts(data);
        }
      } catch (error) {
        // If Unauthorized
        if (error?.response.status === HttpStatusCode.Unauthorized) {
          navigate("/login");
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;

    const existingProduct = cart.find((item) => item._id === productId);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      updateCart(updatedCart);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const existingProduct = cart.find((item) => item._id === productId);

    if (existingProduct) {
      const updatedCart = cart
        .map((item) =>
          item._id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      updateCart(updatedCart);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-left mb-4">Products</h2>
        <Row className="g-4">
          {products.map((product) => (
            <Col md={4} key={product._id}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-3">{product.name}</Card.Title>
                  <Card.Text className="mb-3">{product.description}</Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="d-flex justify-content-between">
                      <strong>Price:</strong>
                      <span>
                        {product.price} {product.currency}
                      </span>
                    </ListGroupItem>
                  </ListGroup>

                  {isAuthenticated ? (
                    <>
                      {" "}
                      {cart.some((item) => item._id === product._id) ? (
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <Button
                            variant="outline-dark"
                            onClick={() => handleRemoveFromCart(product._id)}
                            size="sm"
                          >
                            -
                          </Button>
                          <span>
                            {
                              cart.find((item) => item._id === product._id)
                                ?.quantity
                            }
                          </span>
                          <Button
                            variant="outline-dark"
                            onClick={() => handleAddToCart(product._id)}
                            size="sm"
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="dark"
                          className="w-100 mt-3"
                          onClick={() => handleAddToCart(product._id)}
                          disabled={!isAuthenticated}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </>
                  ) :  null}
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
