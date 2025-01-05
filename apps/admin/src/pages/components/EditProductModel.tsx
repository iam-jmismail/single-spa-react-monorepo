import { IProduct, ProductFactory } from "@shared/factories/ProductFactory";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { useProduct } from "../../context/ProductContext";

type Props = {
  selectedProduct: IProduct;
  setShowModal: (value: boolean) => void;
};

export const EditProductModel = ({ selectedProduct, setShowModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const { updateProducts, products } = useProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IProduct>({
    defaultValues: {
      name: selectedProduct.name,
      price: selectedProduct.price,
      currency: selectedProduct.currency,
      description: selectedProduct.description,
    },
  });

  const handleSaveChanges = async (data: IProduct) => {
    try {
      setLoading(true);
      const { status } = await ProductFactory.updateProduct(
        selectedProduct._id,
        data
      );

      if (status === HttpStatusCode.NoContent) {
        toast.success(`Product Updated`);
        updateProducts(
          products.map((product) =>
            product._id === selectedProduct._id
              ? {
                  ...products.find((p) => p._id === selectedProduct._id),
                  ...data,
                }
              : product
          )
        );
        setShowModal(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || `Something went wrong!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(handleSaveChanges)}>
        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Form.Control type="text" isInvalid={!!errors.name} {...field} />
            )}
            rules={{ required: "Product name is required" }}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              {errors.name.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <Form.Control
                type="number"
                isInvalid={!!errors.price}
                {...field}
              />
            )}
            rules={{
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
            }}
          />
          {errors.price && (
            <Form.Control.Feedback type="invalid">
              {errors.price.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formProductCurrency">
          <Form.Label>Currency</Form.Label>
          <Controller
            control={control}
            disabled={true}
            name="currency"
            render={({ field }) => (
              <Form.Control
                type="text"
                isInvalid={!!errors.currency}
                {...field}
              />
            )}
            rules={{ required: "Currency is required" }}
          />
          {errors.currency && (
            <Form.Control.Feedback type="invalid">
              {errors.currency.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
          Save
        </Button>
        <Button
          className="mx-2 my-4"
          variant="secondary"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
      </Form>
    </div>
  );
};
