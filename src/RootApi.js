import axios from "axios";
import { baseLoginUrl, baseUrl } from "./config";

export const RootLoginApi = axios.create({
  baseURL: baseLoginUrl,
});

export const RootBaseApi = axios.create({
  baseURL: baseLoginUrl,
});

export const RootApi = axios.create({
  baseURL: baseUrl,
});
