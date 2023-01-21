import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[],
  loading: boolean,
  error: string,
};

const initialState: UsersState = {
  users: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      // eslint-disable-next-line no-console
      console.log('starting');
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Unable to load users.';
    });
  },
});

export default usersSlice.reducer;
export const { actions } = usersSlice;