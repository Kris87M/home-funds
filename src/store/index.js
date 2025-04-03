import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import balanceSheetReducer from './slices/balanceSheetSlice';
import incomeReducer from './slices/incomeSlice';
import recurringBillsReducer from './slices/recurringBillsSlice';
import potsReducer from './slices/potsSlice'

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    balanceSheet: balanceSheetReducer,
    income: incomeReducer,
    recurringBills: recurringBillsReducer,
    pots: potsReducer,
  },
  devTools: true,
});

export default store;
