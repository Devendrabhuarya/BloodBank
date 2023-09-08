import { createSlice } from '@reduxjs/toolkit';

const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {
        loader: false,
    },
    reducers: {
        setLoader(state, action) {
            state.loader = action.payload;
        }
    }
});

export const { setLoader } = loadersSlice.actions;
export default loadersSlice.reducer;