import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { loginUser } = userSlice.actions

export default userSlice.reducer