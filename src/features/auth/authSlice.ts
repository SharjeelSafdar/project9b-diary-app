import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlert } from "../../services/sweetAlertHelpers/util";

import http from "../../services/api";
import { AuthResponse } from "../../services/mirage/routes/user";
import { LogInFormValues, SignUpFormValues } from "./auth.types";
import { setUser } from "./userSlice";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: "null",
  isAuthenticated: false,
};

export const logIn = createAsyncThunk(
  "auth/login",
  async (data: LogInFormValues, { dispatch }) => {
    return await http
      .post<LogInFormValues, AuthResponse>("/auth/login", data)
      .then((res) => {
        const { user, token } = res;
        dispatch(setUser(user));
        return token;
      });
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data: SignUpFormValues, { dispatch }) => {
    return await http
      .post<SignUpFormValues, AuthResponse>("/auth/signup", data)
      .then((res) => {
        const { user, token } = res;
        dispatch(setUser(user));
        return token;
      });
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    dispatch(setUser(null));
  }
);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [logIn.fulfilled.type]: (
      state,
      { payload: authToken }: PayloadAction<string>
    ) => {
      state.token = authToken;
      state.isAuthenticated = true;
      showAlert("Login successful!", "success");
    },
    [logIn.rejected.type]: () => {
      showAlert("Login failed!", "error");
    },
    [signUp.fulfilled.type]: (
      state,
      { payload: authToken }: PayloadAction<string>
    ) => {
      state.token = authToken;
      state.isAuthenticated = true;
      showAlert("Login successful!", "success");
    },
    [signUp.rejected.type]: () => {
      showAlert("Login failed!", "error");
    },
    [logOut.fulfilled.type]: (state) => {
      state.token = "null";
      state.isAuthenticated = false;
      showAlert("Logged out successfully!", "success");
    },
    [logOut.rejected.type]: () => {
      showAlert("Logging out failed!", "error");
    },
  },
});

export default auth.reducer;
