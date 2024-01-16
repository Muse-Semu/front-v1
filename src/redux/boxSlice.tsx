import { createSlice } from "@reduxjs/toolkit"

const boxSlice = createSlice({
    name:"box",
    initialState:{
        isOpen:false,
        message : '',
        isConfirmBox:false
    },
    reducers:{
        showBox:(state,action)=>{
            state.isOpen = !state.isOpen
            state.message = action.payload
        },

        showConfirmBox:(state,action)=>{
            state.isConfirmBox = !state.isConfirmBox
        }

    }
})

export const boxAction = boxSlice.actions;
export default boxSlice;