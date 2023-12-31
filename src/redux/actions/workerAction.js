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
    // console.log("viewSingleWorkers-vid=>", viewId);
    const response = await RootApi.get(`/worker/${viewId}`);
    // console.log("response-view===>", response);
    return response.data;
  }
);

// Add Action
export const addWorker = createAsyncThunk(
  "worker/post",
  async ({ workerData }) => {
    // console.log("addWorker-=>", workerData);
    const response = await RootApi.post(`/worker`, workerData);
    // console.log("response-view===>", response);
    return response.data;
  }
);

// Add Action
export const deleteWorker = createAsyncThunk("worker/delete", async (wid) => {
  console.log("deleteWorker-id-=>", wid);
  const response = await RootApi.delete(`/worker/${wid}`);
  console.log("response-del===>", response);
  return response.data;
});
