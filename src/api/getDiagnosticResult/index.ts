import axios from "axios";

export const getDiagnosticResult = (idResult: string) => {
  // return axios.get("https://jsonplaceholder.typicode.com/todos/1");
  return axios.get(`/api/upload${idResult}`);
};
