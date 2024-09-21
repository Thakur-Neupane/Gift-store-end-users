import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  userList: [], // Add userList to hold all users
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUsers: (state, { payload }) => {
      // Add this reducer
      state.userList = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, setUsers } = actions;
export default reducer;
