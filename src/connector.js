import { createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData, deleteData } from 'config/apiConfig'

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async () => {
    return await getData('/transactions');
  }
);

export const addTransactions = createAsyncThunk(
  'transactions/addTransactions',
  async (newTransaction) => {
    const transactions = await getData('/transactions');
    const newId = transactions.length > 0 ? (Math.max(...transactions.map(transaction => transaction.id)) + 1).toString() : 1;
    const newTransactionWithId = { id: newId, ...newTransaction };
    return await postData('/transactions', newTransactionWithId)
  }
);

export const updateTransactions = createAsyncThunk(
  'transactions/updateTransactions',
  async (updatedRecord) => {
    const { id, ...updatedData } = updatedRecord;
    return await putData(`/transactions/${id}`, updatedData);
  }
);

export const deleteTransactions = createAsyncThunk(
  'transactions/deleteTransactions',
  async (id) => {
    await deleteData(`/transactions/${id}`);
    return id;
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

export const addIncome = createAsyncThunk(
  'income/addIncome',
  async (newIncome) => {
    const incomes = await getData('/income');
    const newId = incomes.length > 0 ? (Math.max(...incomes.map(income => income.id)) + 1).toString() : 1;
    const newIncomeWithId = { id: newId, ...newIncome };
    return await postData('/income', newIncomeWithId);
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

export const getRecurringBills = createAsyncThunk(
  'recurringBills/getRecurringBills',
  async () => {
    return await getData('/recurring-bills');
  }
);

export const addRecurringBills = createAsyncThunk(
  'recurringBills/addRecurringBills',
  async (newRecurringBill) => {
    const recurringBills = await getData('/recurring-bills');
    const newId = recurringBills.length > 0 ? (Math.max(...recurringBills.map(recurringBill => recurringBill.id)) + 1).toString() : 1;
    const newRecurringBillWithId = { id: newId, ...newRecurringBill };
    return await postData('/recurring-bills', newRecurringBillWithId)
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

export const getPots = createAsyncThunk(
  'pots/getPots',
  async () => {
    return await getData('/pots')
  }
)