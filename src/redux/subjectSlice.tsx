import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubject } from "../api/APIService";

export interface StateType {
  subjects: any[];
  status:string,
  error:any
}



const initialState: StateType = {
  subjects: [],
  status:'idle',
  error:null

};

export const fetchSubjects:any = createAsyncThunk<any[], void>("fetch/subjects", async () => {
  try {
    const response = await getSubject().then((res) => res);
    return [...response];
  } catch (error: any) {
    return [];
  }
});

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    
  },

  extraReducers(builder) {
    builder
      .addCase(fetchSubjects.pending, (state, action) => {
        state.status = 'pending';
      })

      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjects = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
       
      });
  },
});

export const selectAllSubjects = (state: any) => state.subject.subjects;
export const getSubjectSatus = (state: any) => state.subject.status;
export const getSubjectError = (state: any) => state.subject.error;

export const subjectAction = subjectSlice.actions;

export default subjectSlice;
