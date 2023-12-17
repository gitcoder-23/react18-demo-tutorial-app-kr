import { createSlice } from "@reduxjs/toolkit";
import { getAllStudent } from "../actions/studentAction";

const initialState = {
  allstudent: [],
  isLoading: false,
  message: "",
};
const studentSlice = createSlice({
  name: "workSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStudent.pending, (state, action) => {
      state.isLoading = true;
      state.message = "Student data connecting";
    });
    builder.addCase(getAllStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allstudent=action.payload
        state.message = "Student data respons";
      });
      builder.addCase(getAllStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.allstudent=[]
        state.message = "Something went wrong";
      });
  },
});

export default studentSlice.reducer