import { createSlice } from '@reduxjs/toolkit';
import { fetchIncome, updateIncome } from 'connector';

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
      .addCase(fetchIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export default incomeSlice.reducer;
