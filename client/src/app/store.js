import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import groupSlice from "../features/groupSlice";
import themaSlice from "../features/themaSlice";
import todoSlice from "../features/todoSlice";
export const store = configureStore({
  reducer: {
    thema: themaSlice,
    auth: authSlice,
    group: groupSlice,
    todo: todoSlice,
  },
});
