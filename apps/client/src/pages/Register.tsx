import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthFactory } from "@shared/factories/AuthFactory";
import { useState } from "react";
import { HttpStatusCode } from "axios";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const Register = () => {
  const [loading, setLoading] = useState({ loading: false });
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

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
      } = await AuthFactory.regsister({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (status === HttpStatusCode.Ok) {
        localStorage.setItem("auth_token", auth_token);

        if (role === 2) {
          if (redirect) {
            navigate(redirect);
          } else {
            navigate("/app");
            return;
          }
        } else {
          window.location.href = "http://localhost:9000/admin";
        }
      }
    } catch (error: any) {
      if (error?.response.status === HttpStatusCode.Conflict) {
        setError("email", { message: "Email already exists" });
      }

      setLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="text-center mb-4">Register</h2>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="mt-3">
          Please fix the errors before submitting.
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="mt-3">
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
          type="submit"
          className="w-100 mt-4"
          disabled={loading.loading}
        >
          Register
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
