import axiosInstance from "../lib/http.lib";

export interface IAuthRequestLoginBody {
  email: string;
  password: string;
}

export type IAuthRegisterRequestBody = IAuthRequestLoginBody & {
  name: string;
};

export type IAuthLoginResponseBody = {
  auth_token: string;
  message: string;
  role: 1 | 2;
};

export class AuthFactory {
  static http = axiosInstance;

  static async login(reqBody: IAuthRequestLoginBody) {
    return await this.http.post<IAuthLoginResponseBody>("/auth/login", reqBody);
  }

  static async regsister(reqBody: IAuthRegisterRequestBody) {
    return await this.http.post<IAuthLoginResponseBody>(
      "/auth/signup",
      reqBody
    );
  }
}
