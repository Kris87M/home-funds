import { createSlice } from '@reduxjs/toolkit';
import { getPots, updatePot } from 'connector';

const pots = createSlice({
  name: 'pots',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getPots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // .addCase(addPots.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(addPots.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.items.push(action.payload);
      // })
      // .addCase(addPots.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      .addCase(updatePot.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      // .addCase(deletePot.fulfilled, (state, action) => {
      //   state.items = state.items.filter((item) => item.id !== action.payload);
      // });
  }
});

export default pots.reducer;
