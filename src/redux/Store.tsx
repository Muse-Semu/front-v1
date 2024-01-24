import { configureStore } from "@reduxjs/toolkit";
import examSlice from "./examSlice";
import boxSlice from "./boxSlice";
import subjectSlice from "./subjectSlice";
import examCategorySlice from "./examCategorySlice";

const store = configureStore({
  reducer: {
    exam: examSlice.reducer,
    box: boxSlice.reducer,
    subject: subjectSlice.reducer,
    examCategory: examCategorySlice.reducer,
  },
});

export default store;
