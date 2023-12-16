import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootApi } from "../../RootApi";
// import axios from "axios";

export const getAllWorkers = createAsyncThunk("worker/get", async () => {
  // const reaponse = await axios.get('')
  const response = await RootApi.get("/workerdfd");
  console.log("response===>", response);
  return response.data.reverse();
});
