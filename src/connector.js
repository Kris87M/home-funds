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

export const updateIncome = createAsyncThunk(
  'income/updateIncome',
  async (updatedRecord) => {
    const { id, ...updatedData } = updatedRecord;

    const response = await fetch(`http://localhost:4000/income/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Nie udało się zaktualizować danych');
    }

    const data = await response.json();
    return data;
  }
);

export const deleteIncome = createAsyncThunk(
  'income/deleteIncome',
  async (id) => {
    const response = await fetch(`http://localhost:4000/income/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Nie udało się usunąć danych');
    }

    return id;
  }
);
