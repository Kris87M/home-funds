import { createSlice } from '@reduxjs/toolkit';
import { getIncome, updateIncome, deleteIncome } from 'connector';

const incomeSlice = createSlice({
  name: 'income',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default incomeSlice.reducer;
