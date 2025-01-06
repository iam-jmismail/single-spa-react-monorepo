import Layout from "@shared/components/Layout";
import {
  DashboardFactory,
  IDashboardMetricsResponse,
} from "@shared/factories/Dashboard";
import { HttpStatusCode } from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

type Props = {};

function Dashboard({}: Props) {
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState<IDashboardMetricsResponse>({
    orders: 0,
    products: 0,
    users: 0,
  });

  useEffect(() => {
    setLoading(true);
    const fetchMetrics = async () => {
      const {
        status,
        data: { data },
      } = await DashboardFactory.getMetrics();
      try {
        if (status === HttpStatusCode.Ok) {
          setMetrics(data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <Layout isAdmin>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="my-4">Dashboard</h3>
        </div>
        <div></div>
      </div>

      {loading && <p>Loading...</p>}

      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {/* Orders  */}
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text className="fs-2 fw-bold">{metrics.orders}</Card.Text>
              <Card.Footer className="text-muted">Total Orders</Card.Footer>
            </Card.Body>
          </Card>
        </Col>

        {/* Products  */}
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <Card.Text className="fs-2 fw-bold">{metrics.products}</Card.Text>
              <Card.Footer className="text-muted">Total Products</Card.Footer>
            </Card.Body>
          </Card>
        </Col>

        {/* Users  */}
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text className="fs-2 fw-bold">{metrics.users}</Card.Text>
              <Card.Footer className="text-muted">Total Users</Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Dashboard;
