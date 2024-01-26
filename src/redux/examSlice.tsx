import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getExams } from "../api/APIService";
import { baseUrl } from "../api/http-common";

export interface StateType {
  exams: any[];
  status:string
  error: any;
}



const initialState: StateType = {
  exams: [],
  status:'idle',
  error:null
 
};

export const fetchExams = createAsyncThunk<any[], void>(
  "fetch/exam",
  async () => {
    try {
      const response = await baseUrl.get("/exam");
      return response ? [...response.data] : [];
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
        state.status = 'pending';
      })

      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.status = 'failed'
        state.error = "Error";
        
      });
  },
});

export const selectAllExams = (state:any)=>state.exam.exams
export const getExamSatus = (state:any) => state.exam.status;
export const getExamError = (state:any)=>state.exam.error

export const examAction = examSlice.actions;

export default examSlice;
