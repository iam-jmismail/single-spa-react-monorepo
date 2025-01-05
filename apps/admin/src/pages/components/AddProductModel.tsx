import { IProduct, ProductFactory } from "@shared/factories/ProductFactory";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { useProduct } from "../../context/ProductContext";

type Props = {
  setShowModal: (value: boolean) => void;
};

export const AddProductModel = ({ setShowModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const { updateProducts, products } = useProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IProduct>({
    defaultValues: {
      name: "",
      price: 0,
      currency: "INR",
      description: "",
    },
  });

  console.log("errors", errors);

  const handleSaveChanges = async (data: IProduct) => {
    try {
      setLoading(true);
      const {
        status,
        data: { data: responseData },
      } = await ProductFactory.addProduct({
        ...data,
        price: +data.price || 0,
      });
      if (status === HttpStatusCode.Ok) {
        toast.success(`Product Added`);
        updateProducts([responseData, ...products]);
        setShowModal(false);
      }
    } catch (error) {
      if (error?.response?.status === HttpStatusCode.Conflict) {
        setError("name", { message: "Product already exists!" });
        return;
      }

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
            name="currency"
            disabled={true}
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

        <Button variant="dark" type="submit">
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
