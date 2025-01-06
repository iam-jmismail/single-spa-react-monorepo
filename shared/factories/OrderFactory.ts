import axiosInstance, { ApiResponse } from "../lib/http.lib";

interface IProductDto {
  productId: string;
  quantity: number;
}

export interface IAddOrderReqBody {
  products: IProductDto[];
}

export enum OrderTypes {
  Pending = 1,
  Dispatched = 2,
  Rejected = 3,
}

export interface IOrdersDto {
  _id: string;
  orderNumber: number;
  totalOrderPrice: number;
  products: (Partial<IProductDto> & { quantity: number })[];
  status: OrderTypes;
  createdAt: Date;
  updatedAt: Date;
}
export class OrderFactory {
  static http = axiosInstance;

  static async placeOrder(reqBody: IAddOrderReqBody) {
    return await this.http.post<ApiResponse<null>>("/order", reqBody);
  }

  static async listOrders() {
    return await this.http.get<ApiResponse<IOrdersDto[]>>("/order");
  }

  static async updateOrder(orderId: string, status: OrderTypes) {
    return await this.http.put(`/order/${orderId}`, { status });
  }
}
