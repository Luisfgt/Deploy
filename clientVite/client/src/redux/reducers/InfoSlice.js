import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInfo: '',
    currentPage: 1,
}

export const infoSlice = createSlice({
    name: 'info',
    initialState: initialState,
    reducers: {
        changeInfo:(state, action) =>{
            state.searchInfo = action.payload
        },
        changeCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export const { changeInfo, changeCurrentPage } = infoSlice.actions
export default infoSlice.reducer