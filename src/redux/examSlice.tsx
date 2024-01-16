import { createSlice } from "@reduxjs/toolkit";
import { getExams, getSubject } from "../api/APIService";


interface StateType {
  isOpened: boolean;
  subject: any[];
  exams:any[];
  exam_category: any[];
}

const initialState: StateType = {
  isOpened: false,
  subject: [],
  exams: [],
  exam_category: [],
};

const examSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    handleOpen: (state) => {
      state.isOpened = !state.isOpened;
    },
    handleAdd: (state, action) => {
      // Handle adding an exam here, using appropriate types
    },
    fetchSubject: (state) => {
      state.subject = getSubject()
    },
    fetchExams:  (state) => {
     state.exams = getExams();
    
    },
  },
});

export const examAction = examSlice.actions;

export default examSlice;
