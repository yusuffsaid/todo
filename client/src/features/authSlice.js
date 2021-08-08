import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const user = await axios.post("/api/auth/login", data);
  return user.data.user;
});

export const registerUser = createAsyncThunk("auth/register", async (data) => {
  const user = await axios.post("/api/auth/register", data);
  return user.data.user;
});

export const setCurrentUser = createAsyncThunk("auth/getUser", async (id) => {
  const user = await axios("/api/user/" + id);
  return user.data.user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await axios("/api/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [setCurrentUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [logout.fulfilled]: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
