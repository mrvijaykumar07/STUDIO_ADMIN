import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import clientReducer from "./clientSlice";
import eventReducer from "./eventSlice"; // ✅ abhi naya import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    events: eventReducer, // ✅ ab sahi register hua
  },
});
