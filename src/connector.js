import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await fetch('/transactions');
    const data = await response.json();
    return data;
  }
);

export const fetchBalanceSheet = createAsyncThunk(
  'balanceSheet/fetchBalanceSheet',
  async () => {
    const response = await fetch('/balance-sheet');
    const data = await response.json();
    return data;
  }
);

export const fetchIncome = createAsyncThunk(
  'income/fetchIncome',
  async () => {
    const response = await fetch('/income');
    const data = await response.json();
    return data;
  }
);

export const fetchRecurringBills = createAsyncThunk(
  'recurringBills/fetchRecurringBills',
  async () => {
    const response = await fetch('/recurring-bills');
    const data = await response.json();
    return data;
  }
);

