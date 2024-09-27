import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    userStories: [],
    food: [],
    health: [],
    education: [],
    movie: [],
    travel: []
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
            const key = action.payload.key
            state[key] = action.payload.data
        },
        addStory: (state, action) => {
            const key = action.payload.key
            const obj = action.payload.data
            state[key].push(obj)
        },
        removeStory: (state, action) => {
            const key = action.payload.key
            const objKey = action.payload.data
            state[key] = state[key].filter(ele=> ele._id != objKey)
        }
    }
})

export const { setUser, setLoading, setStories, addStory, removeStory } = storySlice.actions

export default storySlice.reducer