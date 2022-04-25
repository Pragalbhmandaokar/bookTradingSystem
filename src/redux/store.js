import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import  bookReducer  from "./bookManagement";
export default configureStore({
  reducer: {
    user: userReducer,
    bookDetails: bookReducer,
  },
});