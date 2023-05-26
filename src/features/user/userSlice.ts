import {createSlice} from '@reduxjs/toolkit';
import {GetUserData} from '../../types';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
  user: GetUserData | null;
}

const initialState: UserState = {
  user: {
    name: '',
    email: '',
    _id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetUserData | null>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
