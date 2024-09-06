import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { RootState } from '@/store';

interface State {
  listSkeleton?: boolean;
  noSelectedSkeleton?: boolean;
}

const initialState: State = {
  listSkeleton: true,
  noSelectedSkeleton: true
};

const skeletonSlice = createSlice({
  name: 'skeletonSlice',
  initialState,
  reducers: {
    setSkeleton: (state: State, action: PayloadAction<State>) => {
      const { listSkeleton, noSelectedSkeleton } = action.payload;
      state.listSkeleton = listSkeleton;
      state.noSelectedSkeleton = noSelectedSkeleton;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state.listSkeleton = initialState.listSkeleton;
      state.noSelectedSkeleton = initialState.noSelectedSkeleton;
    });
  }
});

export const { setSkeleton } = skeletonSlice.actions;

export const selectSkeletonSlice = (state: RootState) =>
  state.skeletonSliceReducer;

export default skeletonSlice.reducer;
