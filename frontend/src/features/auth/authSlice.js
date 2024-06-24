import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../hooks/api";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("/auth/login", async (credentials) => {
  const data = await post("/auth/login", credentials);
  localStorage.setItem("token", data.token);
  return data;
});

export const register = createAsyncThunk("/auth/register", async (userInfo) => {
  const data = await post("/auth/register", userInfo);
  localStorage.setItem("token", data.token);
  return data;
});

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (token) => {
    if (!token) {
      throw new Error("No token provided");
    }
    localStorage.setItem("token", token);
    return { token }; // Assuming token is already valid, no need to make another API call
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await post("/auth/logout");
  localStorage.removeItem("token");
});

export const getMe = createAsyncThunk("auth/me", async (thunkAPI) => {
  try {
    const response = await get("/auth/me");
    return response;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
