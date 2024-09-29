import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    userStories: []
}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setStories: (state, action) => {
            const data = action.payload
            state.userStories = data
        },
        addStory: (state, action) => {
            const data = action.payload
            if(Array.isArray(data)) {
                state.userStories = [...state.userStories, ...data]
            }
            else if(data) {
                state.userStories.push(data)
            }
        },
        removeStory: (state, action) => {

        }
    }
})

export const { setUser, setLoading, setStories, addStory, removeStory } = storySlice.actions

export default storySlice.reducer