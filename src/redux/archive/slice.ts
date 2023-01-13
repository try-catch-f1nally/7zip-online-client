import {createSlice} from '@reduxjs/toolkit';
import {ArchiveState} from './types';
import {archiveApi} from './archive-api';

const initialState: ArchiveState = {};

export const archiveSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(archiveApi.endpoints.getProgress.matchFulfilled, (state, {payload}) => {
      state.status = payload.status;
      state.percentage = payload.percentage;
      state.errorMessage = payload.errorMessage;
    });
  }
});

export default archiveSlice.reducer;
