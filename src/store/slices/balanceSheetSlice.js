import { createSlice } from '@reduxjs/toolkit';
import { getBalanceSheet } from 'connector';

const balanceSheetSlice = createSlice({
  name: 'balanceSheet',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceSheet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBalanceSheet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getBalanceSheet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default balanceSheetSlice.reducer;
