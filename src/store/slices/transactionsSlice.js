import { createSlice } from '@reduxjs/toolkit';
import { getTransactions, addTransactions, updateTransactions, deleteTransactions } from 'connector';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })   
      .addCase(addTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateTransactions.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  }
});

export default transactionsSlice.reducer;
