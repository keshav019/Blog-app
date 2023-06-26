import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASEURL = "http://localhost:4000";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/auth/signup`,
        userData
      );
      return response;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue(err?.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/auth/login`,
        userData
      );
      return response;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue(err?.response.data);
    }
  }
);
export const profile = createAsyncThunk(
  "auth/profile",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${BASEURL}/api/v1/auth/me`, config);
      return response;
    } catch (err) {
      if (!err.response) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue(err?.response.data);
    }
  }
);
const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  user: user,
  error: null,
  isLoading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut() {
      localStorage.removeItem("userInfo");
      return {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(profile.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
