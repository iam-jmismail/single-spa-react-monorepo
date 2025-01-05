import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { AuthFactory } from "../factories/AuthFactory";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState({ loading: false });
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = window.location.pathname.split("/")[1] === "admin";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setLoading((prev) => ({ ...prev, loading: true }));
    try {
      const {
        status,
        data: { role, auth_token },
      } = await AuthFactory.login({
        email: formData.email,
        password: formData.password,
      });

      if (status === HttpStatusCode.Ok) {
        if (isAdmin && role == 1) {
          localStorage.setItem("auth_token", auth_token);
          window.location.href = "/admin/orders";
        } else if (isAdmin && role !== 1) {
          setError("email", { message: "Invalid user" });
        } else if (!isAdmin && role == 2) {
          localStorage.setItem("auth_token", auth_token);
          window.location.href = "/app";
        } else if (!isAdmin && role !== 2) {
          setError("email", { message: "Invalid user" });
        }
      }
    } catch (error) {
      if (error?.response.status === HttpStatusCode.NotFound) {
        setError("email", { message: "Invalid email or password" });
      }
    } finally {
      setLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">
        {" "}
        {isAdmin ? "Admin Login" : "Login"}{" "}
      </h2>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Please fix the errors before submitting.
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group controlId="formBasicemail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="dark"
          disabled={loading.loading}
          type="submit"
          className="w-100 mt-4"
        >
          Login
        </Button>
      </Form>

      {!isAdmin ? (
        <div className="text-center mt-3">
          <Link to="/signup">Don't have an account? Signup</Link>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
