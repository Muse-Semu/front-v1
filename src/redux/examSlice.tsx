import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getExams } from "../api/APIService";
import { baseUrl } from "../api/http-common";

export interface StateType {
  questions:any[],
  exams: any[];
  status:string
  error: any;
}



const initialState: StateType = {
  exams: [],
  questions:[],
  status:'idle',
  error:null
 
};

export const fetchExams:any = createAsyncThunk<any[], void>(
  "fetch/exam",
  async () => {
    try {
      const response = await getExams();
      return response ? [...response] : [];
    } catch (error: any) {
      return [];
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
  
   
  },

  extraReducers(builder) {
    builder
      .addCase(fetchExams.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error";
      })

     
  },
});

export const selectAllExams = (state:any)=>state.exam.exams
export const getExamSatus = (state:any) => state.exam.status;
export const getExamError = (state:any)=>state.exam.error


export const examAction = examSlice.actions;

export default examSlice;
