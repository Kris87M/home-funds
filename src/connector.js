import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, postData, putData, deleteData } from 'config/apiConfig'

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    return await fetchData('/transactions');
  }
);

export const fetchBalanceSheet = createAsyncThunk(
  'balanceSheet/fetchBalanceSheet',
  async () => {
    return await fetchData('/balance-sheet');
  }
);

export const fetchIncome = createAsyncThunk(
  'income/fetchIncome',
  async () => {
    return await fetchData('/income');
  }
);

export const fetchRecurringBills = createAsyncThunk(
  'recurringBills/fetchRecurringBills',
  async () => {
    return await fetchData('/recurring-bills');
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
