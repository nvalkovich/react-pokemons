import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchQuery: '',
  },
  reducers: {
    search(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { search } = searchSlice.actions;

export default searchSlice.reducer;
