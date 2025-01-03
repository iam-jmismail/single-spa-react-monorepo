import axiosInstance, { ApiResponse } from "../lib/http.lib";

interface IProductDto {
  productId: string;
  quantity: number;
}

export interface IAddOrderReqBody {
  products: IProductDto[];
}

export class OrderFactory {
  static http = axiosInstance;

  static async placeOrder(reqBody: IAddOrderReqBody) {
    return await this.http.post<ApiResponse<null>>("/order", reqBody);
  }
}
