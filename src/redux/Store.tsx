import { configureStore } from "@reduxjs/toolkit";
import examSlice from "./examSlice";
import boxSlice from "./boxSlice";

const store =configureStore({
   reducer:{
    exam:examSlice.reducer,
    box:boxSlice.reducer
   }
})

export default store;