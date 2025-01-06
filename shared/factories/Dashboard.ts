import axiosInstance, { ApiResponse } from "../lib/http.lib";

export interface IDashboardMetricsResponse {
  orders: number;
  products: number;
  users: number;
}

export class DashboardFactory {
  static http = axiosInstance;
  static async getMetrics() {
    return await this.http.get<ApiResponse<IDashboardMetricsResponse>>(
      `/dashboard`
    );
  }
}
