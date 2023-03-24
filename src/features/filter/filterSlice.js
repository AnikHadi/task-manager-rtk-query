import { createSlice } from "@reduxjs/toolkit";

// initialize state
const initialState = {
  searchByFilter: "",
  checkedByFilter: [],
  projectNameArray: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
      state.searchByFilter = action.payload;
    },
    filterByProjectName: (state, action) => {
      const exists = state.checkedByFilter.find(
        (d) => d.id === action.payload.id
      );

      let index = state.projectNameArray.indexOf(exists?.projectName);
      if (exists?.id) {
        state.checkedByFilter = state.checkedByFilter.filter(
          (d) => d.id !== exists?.id
        );
        state.projectNameArray.splice(index, 1);
      } else {
        state.checkedByFilter.push(action.payload);
        state.projectNameArray.push(action.payload.projectName);
      }
    },
    filterByProjectNameClear: (state) => {
      state.checkedByFilter = [];
      state.projectNameArray = [];
    },
  },
});

export default filterSlice.reducer;
export const { filterBySearch, filterByProjectName, filterByProjectNameClear } =
  filterSlice.actions;
