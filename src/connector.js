import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData, deleteData } from 'config/apiConfig'

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    return await getData('/transactions');
  }
);

export const fetchBalanceSheet = createAsyncThunk(
  'balanceSheet/fetchBalanceSheet',
  async () => {
    return await getData('/balance-sheet');
  }
);

export const fetchIncome = createAsyncThunk(
  'income/fetchIncome',
  async () => {
    return await getData('/income');
  }
);

export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (updatedRecord) => {
    const { id, ...updatedData } = updatedRecord;
    return await putData(`/income/${id}`, updatedData);
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (id) => {
    await deleteData(`/income/${id}`);
    return id;
  }
);

export const fetchRecurringBills = createAsyncThunk(
  'recurringBills/fetchRecurringBills',
  async () => {
    return await getData('/recurring-bills');
  }
);

export const updateRecurringBill = createAsyncThunk(
  'recurringBills/updateRecurringBills',
  async (updatedRecord) => {
    const { id, ...updatedData } = updatedRecord;
    return await putData(`/recurring-bills/${id}`, updatedData);
  }
);

export const deleteRecurringBill = createAsyncThunk(
  'recurringBills/deleteRecurringBill',
  async (id) => {
    await deleteData(`/recurring-bills/${id}`);
    return id;
  }
);
