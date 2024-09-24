import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setUser} = storySlice.actions

export default storySlice.reducer