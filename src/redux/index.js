import { configureStore, createReducer } from "@reduxjs/toolkit";
import workerSlice from "./reducers/workerSlice";
import studentSlice from "./reducers/studentSlice";

export const store = configureStore({
  reducer: {
    worker: workerSlice,
    student:studentSlice
  },
});
