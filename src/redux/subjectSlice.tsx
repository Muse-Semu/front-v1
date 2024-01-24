import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubject } from "../api/APIService";

export interface StateType {
  isOpened: boolean;
  subjects: any[];
  isLoading: boolean;
  error: String;
}

export const fetchSubjects = createAsyncThunk("fetch/subject", async () => {
  try {
    const response = await getSubject().then((res) => res);
    return [...response];
  } catch (error: any) {
    return [{ error: "Connection refuced" }];
  }
});

const initialState: StateType = {
  isOpened: false,
  subjects: [],
  isLoading: false,
  error: "",
};
const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.isOpened = !state.isOpened;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchSubjects.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error";
        state.subjects = [];
      });
  },
});

export const subjectAction = subjectSlice.actions;

export default subjectSlice;