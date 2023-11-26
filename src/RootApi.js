import axios from "axios";
import { baseLoginUrl } from "./config";

export const RootLoginApi = axios.create({
  baseURL: baseLoginUrl,
});

export const RootBaseApi = axios.create({
  baseURL: baseLoginUrl,
});
