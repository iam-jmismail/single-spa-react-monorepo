import Layout from "@shared/components/Layout";
import { ProductFactory, IProduct } from "@shared/factories/ProductFactory";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { EditProductModel } from "./components/EditProductModel";
import moment from "moment";
import { useProduct } from "../context/ProductContext";
import { AddProductModel } from "./components/AddProductModel";

type Props = {};

export const Products = (props: Props) => {
  const navigate = useNavigate();
  const { products, updateProducts } = useProduct();

  const [loading, setLoading] = useState({
    list: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IProduct>({
    defaultValues: {
      name: "",
      price: 0,
      currency: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading((prev) => ({ ...prev, list: true }));
      try {
        const {
          status,
          data: { data },
        } = await ProductFactory.getProducts();
        if (status === 200) {
          updateProducts(data);
        }
      } catch (error) {
        if (error?.response.status === HttpStatusCode.Unauthorized) {
          navigate("/login");
        }
      } finally {
        setLoading((prev) => ({ ...prev, list: false }));
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleShowModal = (product: IProduct) => {
    setSelectedProduct(product);
    reset(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="my-4">Products</h3>
        </div>

        <div>
          <Button
            variant="outline-dark"
            className="my-1"
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>
      </div>
      {loading.list && <p>Loading...</p>}

      <Table striped bordered>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            ({ _id, name, price, description, currency, createdAt }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{price}</td>
                <td>{currency}</td>
                <td>{moment(createdAt).format("YYYY-MM-DD hh:mm A")}</td>
                <td>
                  <Button
                    variant="warning-outline"
                    onClick={() =>
                      handleShowModal({
                        _id,
                        name,
                        price,
                        description,
                        currency,
                        createdAt,
                        updatedAt: createdAt,
                        isDeleted: false,
                      })
                    }
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger-outline"
                    onClick={() => alert(`Deleting ${name}`)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProductModel
              selectedProduct={selectedProduct}
              setShowModal={setShowModal}
            />
          </Modal.Body>
        </Modal>
      )}

      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProductModel setShowModal={setShowAddModal} />
        </Modal.Body>
      </Modal>
    </Layout>
  );
};
