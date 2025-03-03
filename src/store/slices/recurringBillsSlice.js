import { createSlice } from '@reduxjs/toolkit';
import { getRecurringBills } from 'connector';

const recurringBillsSlice = createSlice({
  name: 'recurringBills',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecurringBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getRecurringBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getRecurringBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default recurringBillsSlice.reducer;
