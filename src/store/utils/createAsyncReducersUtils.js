export const createAsyncReducers = (builder, asyncThunk, stateKey) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state[stateKey].loading = true;
      state[stateKey].error = null;
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state[stateKey].loading = false;
      state[stateKey].error = null;

      if (['transactions/addTransactions', 'recurringBills/addRecurringBills', 'income/addIncome'].includes(asyncThunk.typePrefix)) {
        state.items.push(action.payload);
      } 
      else if (asyncThunk.typePrefix === 'recurringBills/copyFromPreviousMonth') {
        state.items = [...state.items, ...action.payload];
      }
      else if (['transactions/updateTransactions', 'income/updateIncome'].includes(asyncThunk.typePrefix)) {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } 
      else if (['transactions/deleteTransactions', 'recurringBills/deleteRecurringBill', 'income/deleteIncome'].includes(asyncThunk.typePrefix)) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } 
      else {
        state[stateKey].data = action.payload;
      }
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state[stateKey].loading = false;
      state[stateKey].error = action.error.message;
    });
};