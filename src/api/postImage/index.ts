import axios from "axios";
import { BASE_URL } from "../../../apiConfig";

export const uploadImageData = (formData: FormData) => {
  return axios.post(`${BASE_URL}/api/v1/items`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
