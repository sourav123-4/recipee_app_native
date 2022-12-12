import {createSlice} from '@reduxjs/toolkit';

const rootReducer = createSlice({
  name: 'receipe',
  initialState: [],
  reducers: {
    saveData: (state, action) => {
      state = action.payload;
    },
  },
});

export const {saveData} = rootReducer.actions;

export default rootReducer.reducer;
