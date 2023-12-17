import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootApi } from "../../RootApi";

export const getAllStudent = createAsyncThunk("student/get", async()=>{
   const res = await RootApi.get("/student")
   return res.data.reverse()
})