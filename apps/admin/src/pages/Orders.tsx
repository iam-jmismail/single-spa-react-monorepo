import Layout from "@shared/components/Layout";
import { IOrdersDto, OrderFactory } from "@shared/factories/OrderFactory";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FaEye, FaTimes, FaTruck } from "react-icons/fa";
import moment from "moment";
import { toast } from "react-toastify";

type Props = {};

export enum OrderTypes {
  Pending = 1,
  Dispatched = 2,
  Rejected = 3,
}

export const Orders = (props: Props) => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<IOrdersDto[]>([]);
  const [loading, setLoading] = useState({
    list: false,
    dispatch: false,
    cancel: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading((prev) => ({ ...prev, list: true }));
      try {
        const {
          status,
          data: { data },
        } = await OrderFactory.listOrders();
        if (status === 200) {
          setOrders(data);
        }
      } catch (error) {
        if (error?.response.status === HttpStatusCode.Unauthorized) {
          navigate("/login");
        }
      } finally {
        setLoading((prev) => ({ ...prev, list: false }));
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleShowModal = (orderId: string, products: any[]) => {
    setSelectedOrderId(orderId);
    setSelectedProducts(products);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProducts([]);
    setSelectedOrderId(null);
  };

  const handleDispatch = async () => {
    if (selectedOrderId) {
      try {
        setLoading((prev) => ({ ...prev, dispatch: true }));
        const { status } = await OrderFactory.updateOrder(selectedOrderId, 2);
        if (status === HttpStatusCode.NoContent) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === selectedOrderId ? { ...order, status: 2 } : order
            )
          );
          toast.error("Order dispatched");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading((prev) => ({ ...prev, dispatch: false }));
      }

      handleCloseModal();
    }
  };

  const handleCancelOrder = async () => {
    if (selectedOrderId) {
      try {
        setLoading((prev) => ({ ...prev, cancel: true }));
        const { status } = await OrderFactory.updateOrder(selectedOrderId, 3);
        if (status === HttpStatusCode.NoContent) {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === selectedOrderId ? { ...order, status: 3 } : order
            )
          );
          toast.error("Order cancelled");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading((prev) => ({ ...prev, cancel: false }));
      }

      handleCloseModal();
    }
  };

  const getOrderStatusBadge = (status: OrderTypes) => {
    switch (status) {
      case OrderTypes.Pending:
        return (
          <Badge pill bg="warning">
            Pending
          </Badge>
        );
      case OrderTypes.Dispatched:
        return (
          <Badge pill bg="success">
            Dispatched
          </Badge>
        );
      case OrderTypes.Rejected:
        return (
          <Badge pill bg="danger">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge pill color="secondary">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <Layout>
      <h3>Orders</h3>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Order Price</th>
            <th>Ordered On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(
            ({ _id, status, createdAt, totalOrderPrice, products }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{getOrderStatusBadge(status)}</td>
                <td>{totalOrderPrice}</td>
                <td>{moment(createdAt).format("YYYY-MM-DD HH:mm A")}</td>
                <td>
                  <Button
                    variant="outline-dark"
                    onClick={() => handleShowModal(_id, products)}
                  >
                    <FaEye />
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map(({ name, quantity, price }, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            disabled={loading.dispatch}
            onClick={handleDispatch}
          >
            <FaTruck /> Dispatch
          </Button>
          <Button
            variant="danger"
            disabled={loading.cancel}
            onClick={handleCancelOrder}
          >
            <FaTimes /> Cancel
          </Button>
          <Button variant="dark" onClick={handleCloseModal}>
            <FaTimes /> Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
