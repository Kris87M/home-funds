import { createSlice } from '@reduxjs/toolkit';
import { fetchRecurringBills } from 'connector';

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
      .addCase(fetchRecurringBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecurringBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecurringBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default recurringBillsSlice.reducer;
