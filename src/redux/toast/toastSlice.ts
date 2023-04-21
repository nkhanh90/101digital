import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  type: null,
  title: '',
  description: '',
};

export const toastSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    showToast(state, action) {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    clearToast(state) {
      state.type = null;
      state.title = '';
      state.description = '';
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
