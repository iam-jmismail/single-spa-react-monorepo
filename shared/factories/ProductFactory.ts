import axiosInstance, { ApiResponse } from "../lib/http.lib";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  isDeleted: boolean;
  updatedAt: Date;
  udpatedAt: Date;
}

export class ProductFactory {
  static http = axiosInstance;

  static async getProducts() {
    return await this.http.get<ApiResponse<IProduct[]>>("/product");
  }
}
