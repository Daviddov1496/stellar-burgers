import { combineSlices } from '@reduxjs/toolkit';
import { authUserSlice } from '../components/slices/authUserSlice';
import { burgerConstructorSlice } from '../components/slices/burgerConstructionSlice';
import { burgerIngredientsSlice } from '../components/slices/burgerIngridientsSlice';
import { feedSlice } from '../components/slices/feedSlice';
import { orderSlice } from '../components/slices/orderSlice';

export const rootReducer = combineSlices(
  authUserSlice,
  burgerConstructorSlice,
  burgerIngredientsSlice,
  feedSlice,
  orderSlice
);
