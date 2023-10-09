import {createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  user: user
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state,action) {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { user:action.payload };
    },
    logOut() {
      localStorage.removeItem("userInfo");
      return {user:null};
    },

  }
});

export const { logOut,login } = authSlice.actions;
export default authSlice.reducer;
