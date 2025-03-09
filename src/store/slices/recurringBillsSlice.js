import { createSlice } from '@reduxjs/toolkit';
import { getRecurringBills, addRecurringBills, deleteRecurringBill, updateRecurringBill } from 'connector';

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
      })
      .addCase(addRecurringBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRecurringBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addRecurringBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateRecurringBill.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteRecurringBill.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  }
});

export default recurringBillsSlice.reducer;
