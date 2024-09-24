import { configureStore } from '@reduxjs/toolkit';
import storyReducer from '../features/storySlice.js';

export const store = configureStore({
    reducer: storyReducer
});