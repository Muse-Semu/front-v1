import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getExams } from "../api/APIService";

export interface StateType {
  isOpened: boolean;
  exams: any[];
  isLoading: boolean;
  error: String;
}

export const fetchExams = createAsyncThunk("fetch/exam", async () => {
  try {
    const response = await getExams().then((res) => res);
    return response
  } catch (error: any) {
    return [{"error":"Connection refuced"}];
  }
});

const initialState: StateType = {
  isOpened: false,
  exams: [],
  isLoading: false,
  error: "",
};
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.isOpened = !state.isOpened;
    },
   
  },

  extraReducers(builder) {
    builder
      .addCase(fetchExams.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchExams.fulfilled, (state, action) => {
        state.exams = action.payload;
        state.isLoading = false
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error";
        state.exams =[]
      });
  },
});

export const examAction = examSlice.actions;

export default examSlice;
