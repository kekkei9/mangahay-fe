import { createSlice } from "@reduxjs/toolkit";

export const isClient = typeof window !== "undefined";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuthUser: isClient ? !!window.localStorage.getItem("user") : false,
    user: JSON.parse(
      isClient ? window.localStorage.getItem("user") ?? "{}" : "{}"
    ),
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        isAuthUser: true,
        user: action.payload,
      };
    },
    logout: (state) => {
      return { ...state, isAuthUser: false, user: {} };
    },
  },
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice.reducer;
