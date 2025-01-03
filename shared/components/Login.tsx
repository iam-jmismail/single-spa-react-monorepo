import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { AuthFactory } from "../factories/AuthFactory";
import { HttpStatusCode } from "axios";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [loading, setLoading] = useState({ loading: false });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
        localStorage.setItem("auth_token", auth_token);

        if (role === 2) {
          window.location.href = "/app";
          return;
        } else {
          window.location.href = "http://localhost:9000/admin";
        }
      }
    } catch (error) {
      setLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">Login</h2>

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

        <Button variant="dark" type="submit" className="w-100 mt-4">
          Login
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>
    </div>
  );
};

export default Login;
