import axiosInstance, { ApiResponse } from "../lib/http.lib";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductFactory {
  static http = axiosInstance;

  static async getProducts() {
    return await this.http.get<ApiResponse<IProduct[]>>("/product");
  }

  static async updateProduct(productId: string, data: Partial<IProduct>) {
    return await this.http.put<ApiResponse<null>>(
      `/product/${productId}`,
      data
    );
  }

  static async addProduct(data: IProduct) {
    return await this.http.post<ApiResponse<IProduct>>(`/product`, data);
  }
}
