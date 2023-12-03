import { createSlice } from '@reduxjs/toolkit';
import { TileData } from '../types/interfaces';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    data: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      conditionsAccepted: '',
      file: FileList,
      country: '',
    },
    dataList: [] as TileData[],
  },
  reducers: {
    setFormData(state, action) {
      state.data = action.payload;
      state.dataList.push(action.payload);
    },
  },
});

export const { setFormData } = formSlice.actions;

export default formSlice.reducer;
