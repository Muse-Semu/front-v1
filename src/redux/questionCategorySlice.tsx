import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestionCategory } from "../api/APIService";

export interface StateType {
  questionCategorys: any[];
  status: string;
  error: any;
}

const initialState: StateType = {
  questionCategorys: [],
  status: "idle",
  error: null,
};
export const fetchQuestionCategory = createAsyncThunk(
  "fetch/questionCategory",
  async () => {
    try {
      
      return await getQuestionCategory();
    } catch (error: any) {
      return [] ;
    }
  }
);

const questionCategorySlice = createSlice({
  name: "questionCategory",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchQuestionCategory.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(fetchQuestionCategory.fulfilled, (state, action) => {
        state.questionCategorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchQuestionCategory.rejected, (state, action) => {
        state.status = "pending";
        state.error = "Error";
      });
  },
});

export const questionCategoryAction = questionCategorySlice.actions;

export const selectAllQuestionCategorys = (state: any) => state.questionCategory.questionCategorys;
export const getQuestionCategorySatus = (state: any) =>
  state.questionCategory.status;
export const getQuestionCategoryError = (state: any) =>
  state.questionCategory.error;

export default questionCategorySlice;
