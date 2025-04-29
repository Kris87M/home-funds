import { createSlice } from '@reduxjs/toolkit';
import { getTransactionsCategories } from 'connector';

const transactionsCategoriesSlice = createSlice({
  name: 'transactionsCategories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransactionsCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getTransactionsCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })   
      // .addCase(addTransactionsCategories.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(addTransactionsCategories.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.items.push(action.payload);
      // })
      // .addCase(addTransactionsCategories.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })

      // .addCase(updateTransactionsCategories.fulfilled, (state, action) => {
      //   state.items = state.items.map((item) =>
      //     item.id === action.payload.id ? action.payload : item
      //   );
      // })
      // .addCase(deleteTransactionsCategories.fulfilled, (state, action) => {
      //   state.items = state.items.filter((item) => item.id !== action.payload);
      // });
  }
});

export default transactionsCategoriesSlice.reducer;
