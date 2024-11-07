import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';

export const getFeeds = createAsyncThunk('orders/get', async () => {
  const getFeed = getFeedsApi();
  return getFeed;
});

export type TFeedSlice = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  feed: {
    total: number;
    totalToday: number;
  };
};

export const initialState: TFeedSlice = {
  orders: [],
  isLoading: false,
  error: null,
  feed: {
    total: 0,
    totalToday: 0
  }
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    changeOrders: (state) => state.orders,
    changeFeeds: (state) => state.feed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки';
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      });
  }
});

export default feedSlice.reducer;
export const feedSliceName = feedSlice.name;
export const { changeFeeds, changeOrders } = feedSlice.selectors;
