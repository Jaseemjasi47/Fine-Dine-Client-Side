import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    admin: false,
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action) {
        const user = action.payload;
        state.name = user.name;
        state.email = user.email;
        state.admin = user.admin;
      },
      clearUser(state) {
        state.name = '';
        state.email = '';
        state.admin = false;
      },
    },
  });

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;