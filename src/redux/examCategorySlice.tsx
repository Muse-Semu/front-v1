import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExamCategory, getExamCategoryById } from "../api/APIService";

export interface StateType {
  examCategorys: any[];
  singleExamCategory: any;
  status: string;
  error: any;
}

const initialState: StateType = {
  examCategorys: [],
  status: "idle",
  error: null,
  singleExamCategory: {},
};

export const fetchExamCategory: any = createAsyncThunk(
  "fetch/examCategory",
  async () => {
    try {
      const response = await getExamCategory();
      return [...response];
    } catch (error: any) {
      return [];
    }
  }
);

export const getSingleExamCategory: any = createAsyncThunk(
  "fetch/examCategoryById",
  async (id) => {
    try {
      const response = await getExamCategoryById(id).then((res) => res.data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

const examCategorySlice = createSlice({
  name: "examCategory",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchExamCategory.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(fetchExamCategory.fulfilled, (state, action) => {
        state.examCategorys = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchExamCategory.rejected, (state, action) => {
        state.status = "pending";
        state.error = "Error";
      })

      .addCase(getSingleExamCategory.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(getSingleExamCategory.fulfilled, (state, action) => {
        state.singleExamCategory = action.payload;
        state.status = "succeeded";
      })
      .addCase(getSingleExamCategory.rejected, (state, action) => {
        state.status = "pending";
        state.error = "Error";
      });
  },
});

export const examCategoryAction = examCategorySlice.actions;

export const selectAllExamCategorys = (state: any) =>
  state.examCategory.examCategorys;
export const getExamCategorySatus = (state: any) => state.examCategory.status;
export const getExamCategoryError = (state: any) => state.examCategory.error;

export const selectSingleExam = (state: any) => state.singleExamCategory;

export default examCategorySlice;
