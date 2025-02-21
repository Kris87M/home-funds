import { createSlice } from '@reduxjs/toolkit';
import { fetchBalanceSheet } from 'connector';

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
      .addCase(fetchBalanceSheet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalanceSheet.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBalanceSheet.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default balanceSheetSlice.reducer;
