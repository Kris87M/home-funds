import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import balanceSheetReducer from './slices/balanceSheetSlice';
import incomeReducer from './slices/incomeSlice';
import recurringBillsReducer from './slices/recurringBillsSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    balanceSheet: balanceSheetReducer,
    income: incomeReducer,
    recurringBills: recurringBillsReducer,
  }
});

export default store;
