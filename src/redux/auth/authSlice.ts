import { IReduxAuthState } from '@/interface/IRedux';
import { ILoginFormProps } from '@/service/authProvider';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState: IReduxAuthState = {
  error: null,
  pending: false,
  data: null,
  isChecked: false,
  isUpdated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: {
      reducer: (state, action: PayloadAction<ILoginFormProps>) => {
        state.pending = true;
        state.data = null;
        state.error = false;
      },
      prepare: (payload: ILoginFormProps) => {
        return { payload };
      },
    },
    loginSuccess(state, action) {
      state.pending = false;
      state.error = false;
      state.data = action.payload;
    },
    loginFail(state, action) {
      state.pending = false;
      state.data = null;
      state.error = action.payload;
    },
    getMe: (state) => {
      state.pending = true;
      state.data = null;
      state.isChecked = true;
      state.error = false;
    },
    getMeSuccess: (state, action) => {
      state.pending = false;
      state.data = action.payload;
      state.error = false;
    },
    getMeFail: (state, action: PayloadAction<ILoginFormProps>) => {
      state.pending = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { login, loginSuccess, loginFail, getMe, getMeSuccess, getMeFail } = authSlice.actions;

export default authSlice.reducer;
