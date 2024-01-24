import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getExamCategory } from "../api/APIService";

export interface StateType {
  isOpened: boolean;
  examCategorys: any[];
  isLoading: boolean;
  error: String;
}

export const fetchExamCategory = createAsyncThunk("fetch/examCategorys", async () => {
  try {
    const response = await getExamCategory().then((res) => res);
    return [...response];
  } catch (error: any) {
    return [{ error: "Connection refuced" }];
  }
});

const initialState: StateType = {
  isOpened: false,
  examCategorys: [],
  isLoading: false,
  error: "",
};
const examCategorySlice = createSlice({
  name: "examCategory",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.isOpened = !state.isOpened;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchExamCategory.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchExamCategory.fulfilled, (state, action) => {
        state.examCategorys = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchExamCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error";
        state.examCategorys = [];
      });
  },
});

export const examCategoryAction = examCategorySlice.actions;

export default examCategorySlice;
