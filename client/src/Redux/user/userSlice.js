import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
        },
        UpdateSuccess: (state, action) => {
            state.user = action.payload;
            state.error = null
        },
        updateFailure : (state, action) => {
            state.error = action.payload
        },
        signOut : (state) => {
            state.user = null;
            state.error = null
        }
    },
})

export const { signInSuccess, signInFailure, updateFailure, UpdateSuccess, signOut } = userSlice.actions;

export default userSlice.reducer;

