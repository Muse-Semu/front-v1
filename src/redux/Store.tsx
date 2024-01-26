import { configureStore } from "@reduxjs/toolkit";
import examSlice from "./examSlice";
import boxSlice from "./boxSlice";
import subjectSlice from "./subjectSlice";
import examCategorySlice from "./examCategorySlice";
import questionCategorySlice from "./questionCategorySlice";

const store = configureStore({
  reducer: {
    exam: examSlice.reducer,
    box: boxSlice.reducer,
    subject: subjectSlice.reducer,
    examCategory: examCategorySlice.reducer,
    questionCategory: questionCategorySlice.reducer,
  },
});

export default store;
