import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData, deleteData } from 'config/apiConfig'

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async () => {
    return await getData('/transactions');
  }
);

export const getBalanceSheet = createAsyncThunk(
  'balanceSheet/getBalanceSheet',
  async () => {
    return await getData('/balance-sheet');
  }
);

export const getIncome = createAsyncThunk(
  'income/getIncome',
  async () => {
    return await getData('/income');
  }
);

export const getRecurringBills = createAsyncThunk(
  'recurringBills/getRecurringBills',
  async () => {
    return await getData('/recurring-bills');
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
