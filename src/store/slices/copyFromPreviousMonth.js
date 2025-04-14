import { createAsyncThunk } from '@reduxjs/toolkit';
import { addRecurringBills } from 'connector';

export const copyFromPreviousMonth = createAsyncThunk(
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
