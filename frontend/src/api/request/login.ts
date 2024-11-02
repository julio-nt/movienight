import axios from "axios";
import { apiUrl } from "../routes";

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/api/login`, { username, password });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.msg || "Erro desconhecido ao fazer login";
    throw new Error(errorMessage);
  }
};

export default login;
