import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    mainLoading: false,
    detailsLoading: false,
  },
  reducers: {
    setMainLoading(state, action) {
      state.mainLoading = action.payload;
    },
    setDetailsLoading(state, action) {
      state.detailsLoading = action.payload;
    },
  },
});

export const { setMainLoading, setDetailsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
