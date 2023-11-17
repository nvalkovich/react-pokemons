import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    itemsPerPage: 12,
    page: 1,
  },
  reducers: {
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setItemsPerPage, setPage } = paginationSlice.actions;

export default paginationSlice.reducer;
