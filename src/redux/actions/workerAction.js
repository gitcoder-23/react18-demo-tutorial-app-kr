import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootApi } from "../../RootApi";
// import axios from "axios";

// All worker action
export const getAllWorkers = createAsyncThunk("worker/get", async () => {
  // const reaponse = await axios.get('')
  const response = await RootApi.get("/worker");
  // console.log("response===>", response);
  return response.data.reverse();
});

// View Action
export const viewSingleWorkers = createAsyncThunk(
  "worker/view",
  async ({ viewId }) => {
    console.log("viewSingleWorkers-vid=>", viewId);
    const response = await RootApi.get(`/worker/${viewId}`);
    console.log("response-view===>", response);
    return response.data;
  }
);
