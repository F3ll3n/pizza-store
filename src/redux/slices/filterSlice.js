import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sort: {
    name: "полярности",
    sortProperty: "rating",
    index: 0,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;