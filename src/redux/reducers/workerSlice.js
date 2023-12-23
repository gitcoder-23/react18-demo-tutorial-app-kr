import { createSlice } from "@reduxjs/toolkit";
import {
  addWorker,
  getAllWorkers,
  viewSingleWorkers,
} from "../actions/workerAction";

const initialState = {
  allWorkers: [],
  singleWorker: {},

  isLoading: false,
  message: "",
};

const workerSlice = createSlice({
  name: "workerSlice",
  initialState: initialState,
  reducers: {},

  extraReducers: function (builder) {
    // Fetch all workers

    builder.addCase(getAllWorkers.pending, (state) => {
      state.isLoading = true;
      state.message = "Worker data is fetching";
    });

    builder.addCase(getAllWorkers.fulfilled, (state, actions) => {
      // console.log("actions==>", actions);
      state.isLoading = false;
      state.allWorkers = actions.payload;
      state.message = "Worker data is fetched";
    });

    builder.addCase(getAllWorkers.rejected, (state, actions) => {
      // console.log("actions==>", actions);
      state.isLoading = false;
      state.allWorkers = [];
      state.message = "Something went wrong";
    });

    // View Single Worker

    builder.addCase(viewSingleWorkers.pending, (state) => {
      state.isLoading = true;
      state.message = "Single worker data is fetching";
    });

    builder.addCase(viewSingleWorkers.fulfilled, (state, actions) => {
      // console.log("actions==>", actions);
      state.isLoading = false;
      state.singleWorker = actions.payload;
      state.message = "Single worker data is fetched";
    });

    builder.addCase(viewSingleWorkers.rejected, (state, actions) => {
      // console.log("actions==>", actions);
      state.isLoading = false;
      state.message = "Something went wrong";
    });

    // Add Single

    builder.addCase(addWorker.pending, (state) => {
      state.isLoading = true;
      state.message = "Data loading";
    });

    builder.addCase(addWorker.fulfilled, (state, actions) => {
      console.log("actions==>", actions);
      state.isLoading = false;
      state.allWorkers = [...state.allWorkers, actions.payload];
      state.message = "New worker added";
    });

    builder.addCase(addWorker.rejected, (state, actions) => {
      // console.log("actions==>", actions);
      state.isLoading = false;
      state.message = "Something went wrong";
    });
  },
});

export default workerSlice.reducer;
