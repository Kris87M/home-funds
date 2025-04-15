import { createAsyncThunk } from '@reduxjs/toolkit';
import { addIncome, addRecurringBills } from 'connector';

export const copyBillsFromPreviousMonth = createAsyncThunk(
  'recurringBills/copyFromPreviousMonth',
  async ({ currentMonth }, thunkAPI) => {
    const state = thunkAPI.getState();
    const allBills = state.recurringBills.items;

    const [year, month] = currentMonth.split('-');
    const prevMonth = String(Number(month) - 1 || 12).padStart(2, '0');
    const prevYear = month === '01' ? String(Number(year) - 1) : year;
    const prevMonthString = `${prevYear}-${prevMonth}`;

    const numericIds = allBills
      .map(item => parseInt(item.id, 10))
      .filter(id => !isNaN(id));
    let nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

    const billsToCopy = allBills.filter(item =>
      item.dueDate?.startsWith(prevMonthString)
    );

    for (const item of billsToCopy) {
      const day = item.dueDate.split('-')[2];
      const newBill = {
        ...item,
        id: String(nextId++),
        dueDate: `${currentMonth}-${day}`,
      };
      await thunkAPI.dispatch(addRecurringBills(newBill));
    }

    return;
  }
);


export const copyIncomeFromPreviousMonth = createAsyncThunk(
  'income/copyIncomeFromPreviousMonth',
  async ({ currentMonth }, thunkAPI) => {
    const state = thunkAPI.getState();
    const allIncome = state.income.items;

    const [year, month] = currentMonth.split('-');
    const prevMonth = String(Number(month) - 1 || 12).padStart(2, '0');
    const prevYear = month === '01' ? String(Number(year) - 1) : year;
    const prevMonthString = `${prevYear}-${prevMonth}`;

    const numericIds = allIncome
      .map(item => parseInt(item.id, 10))
      .filter(id => !isNaN(id));
    let nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;

    const incomeToCopy = allIncome.filter(item =>
      item.date?.startsWith(prevMonthString)
    );

    for (const item of incomeToCopy) {
      const day = item.date.split('-')[2];
      const newIncome = {
        ...item,
        id: String(nextId++),
        date: `${currentMonth}-${day}`,
      };
      await thunkAPI.dispatch(addIncome(newIncome));
    }

    return;
  }
);
