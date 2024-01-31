import axios from "axios";

export const uploadImageData = (formData: FormData) => {
  return axios.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
