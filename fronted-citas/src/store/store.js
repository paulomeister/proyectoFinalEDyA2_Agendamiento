import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { reservacionSlice } from "./slices/reservacionSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    reservacion: reservacionSlice.reducer
  },
});

export default store;