import { createSlice } from '@reduxjs/toolkit';

const monthSlice = createSlice({
  name: 'month',
  initialState: {
    selectedMonth: null,
  },
  reducers: {
    setSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = monthSlice.actions;
export default monthSlice.reducer;
