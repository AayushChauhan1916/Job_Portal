import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  applicants: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setApplicants } = applicationSlice.actions;

export default applicationSlice.reducer;
