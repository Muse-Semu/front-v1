import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExams, getQuestions } from "../api/APIService";
import { baseUrl } from "../api/http-common";

export interface StateType {
  questions: any[];
  status: string;
  error: any;
}

const initialState: StateType = {
  questions: [],
  status: "idle",
  error: null,
};

export const fetchQuestions:any = createAsyncThunk<any[], void>(
  "fetch/questions",
  async () => {
    try {
      const response = await getQuestions().then(res=>res.data);
      return response ? [...response] : [];
    } catch (error: any) {
      return [];
    }
  }
);
const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions= action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Error";
      });
  },
});



export const selectAllQuestions = (state: any) => state.question.questions;
export const getQuestionSatus = (state: any) => state.question.status;
export const getQuestionError = (state: any) => state.question.error;

export const questionAction = questionSlice.actions;

export default questionSlice;
