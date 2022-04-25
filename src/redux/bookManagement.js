import { createSlice } from "@reduxjs/toolkit";

export const bookDetails = createSlice({
  name: "bookDetails",
  initialState: {
    bookDetails: null,
  },
  reducers: {
    addBookFromTrade: (state, action) => {
      state.bookDetails = action.payload;
    },
    removeBook: (state) => {
      state.bookDetails = null;
    },
  },
});

export const { addBookFromTrade, removeBook } = bookDetails.actions;

export const selectBook = (state) => state.bookDetails.bookDetails;

export default bookDetails.reducer;
