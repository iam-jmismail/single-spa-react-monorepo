// toastService.ts
import { toast, ToastOptions } from "react-toastify";

export class Toast {
  private static defaultConfig: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  };

  static success(message: string) {
    toast.success(message, Toast.defaultConfig);
  }

  static error(message: string) {
    toast.error(message, Toast.defaultConfig);
  }

  static warning(message: string) {
    toast.warn(message, Toast.defaultConfig);
  }
}
