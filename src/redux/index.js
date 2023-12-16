import { configureStore, createReducer } from "@reduxjs/toolkit";
import workerSlice from "./reducers/workerSlice";

export const store = configureStore({
  reducer: {
    worker: workerSlice,
  },
});
