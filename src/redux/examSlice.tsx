import { createSlice } from "@reduxjs/toolkit";
import { getExamCategory, getExams, getSubject } from "../api/APIService";

export interface StateType {
  isOpened: boolean;
  subject: any[];
  exams: any[];
  exam_category: any[];
  isLoading: boolean;
}


const initialState: StateType = {
  isOpened: false,
  subject: await getSubject(),
  exams:await getExams(),
  exam_category: await getExamCategory(),
  isLoading: false,
};
const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.isOpened = !state.isOpened;
    },
    handleAdd: (state, action) => {
      // Handle adding an exam here, using appropriate types
    },
    handleLoading(state) {
      state.isLoading = false;
    },
    
  },
});

export const examAction = examSlice.actions;

export default examSlice;
