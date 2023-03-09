import axios, { AxiosError, AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://kabsa.yallababy.com/api/v1/products";

interface ApiError {
  status: number;
  message: string;
}

// Configuración por defecto de Axios
const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    secretKey: '1DIPIkKeq8',
  },
};

// Función que realiza una petición GET a la API
export const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url, axiosConfig);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Si el error es una respuesta de la API
      const apiError = error.response?.data as ApiError;
      throw new Error(apiError.message);
    } else {
      // Si el error es otro tipo de error de red
      throw new Error("Ocurrió un error al realizar la petición");
    }
  }
};
