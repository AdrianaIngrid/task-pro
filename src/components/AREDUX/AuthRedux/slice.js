import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../AuthRedux/operations";

const handlePending = (state) => {
  state.isLoading = true; 
  state.error = null;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload; 
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {email: null,  name: null },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.fulfilled, (state, action) => {
        console.log("Reducer received payload:", action.payload); 
      
        if (!action.payload) {
          state.isLoading = false;
          state.error = "Login failed: Invalid payload.";
          return;
        }
      
        const {email, name, token } = action.payload;
        if (!email || !name || !token) {
          state.error = "Incomplete payload received.";
          state.isLoading = false;
          return;
        }
        state.user = {email, name};
        state.token = token;
        state.isLoggedIn = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(login.pending, handlePending)
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = { name: null, email: null};
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;