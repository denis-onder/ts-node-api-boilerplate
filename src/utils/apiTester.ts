/**
 * This helper function is used
 * for testing the API endpoints.
 */
import axios from "axios";
import { server } from "../config";

export default async (
  method,
  endpoint: String,
  data: any = null,
  token: String = ""
) => {
  axios.defaults.headers.common.Authorization = token;
  const res = await axios[method](
    `http://localhost:${server.port}${endpoint}`,
    data
  );
  return {
    status: res.status,
    data: res.data
  };
};
