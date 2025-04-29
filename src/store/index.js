import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';
import balanceSheetReducer from './slices/balanceSheetSlice';
import incomeReducer from './slices/incomeSlice';
import recurringBillsReducer from './slices/recurringBillsSlice';
import potsReducer from './slices/potsSlice'
import monthReducer from './slices/monthSlice'
import transactionsCategoriesReducer from './slices/transactionsCategorieSlice';

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    balanceSheet: balanceSheetReducer,
    income: incomeReducer,
    recurringBills: recurringBillsReducer,
    pots: potsReducer,
    month: monthReducer,
    transactionsCategories: transactionsCategoriesReducer,
  },
  devTools: true,
});

export default store;
