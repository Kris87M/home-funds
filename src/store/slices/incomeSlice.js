import { createSlice } from '@reduxjs/toolkit';
import { fetchIncome, postIncome } from 'connector';

const IncomeSlice = createSlice({
  name: 'income',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Obsługa dodawania nowego przychodu
      .addCase(postIncome.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postIncome.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload); // Dodajemy nowy element do listy
      })
      .addCase(postIncome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default IncomeSlice.reducer;
