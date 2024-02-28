import { configureStore } from "@reduxjs/toolkit";
import examSlice from "./examSlice";
import boxSlice from "./boxSlice";
// import subjectSlice from "./subjectSlice";
import examCategorySlice from "./examCategorySlice";
import questionCategorySlice from "./questionCategorySlice";
import questionSlice from "./questionSlice";
import { authSlice } from "./authSlice";
import userSlice from "./userSlice";
import authenticationSlice from "./authenticationSlice";


const store = configureStore({
  reducer: {
    // exam: examSlice.reducer,
    // subject: subjectSlice.reducer,
    examCategory: examCategorySlice.reducer,
    questionCategory: questionCategorySlice.reducer,
    question:questionSlice.reducer,
    // authentication:authenticationSlice.reducer,
    // user:userSlice.reducer
  },
});

export default store;
