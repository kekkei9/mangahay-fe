import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authentication/authentication.slice";

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
