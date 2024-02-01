import axios from "axios";
import { BASE_URL } from "../../../apiConfig";

export const getDiagnosticResult = (idResult: string) => {
  return axios.get(`${BASE_URL}/api/v1/items/${idResult}`);
};
