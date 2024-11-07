import { it, expect } from "@jest/globals";
import { TOrderResponse, TNewOrderResponse } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import {
    fetchOrderByNumber,
    orderSlice,
    TOrderSlice,
    initialState,
    postOrderBurger,
    getPlacedOrders
} from "./orderSlice";

const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [
    {
      _id: '672cd796b27b06001c3e6dce',
      status: 'done',
      name: 'Краторный минеральный бургер',
      createdAt: '2024-11-07T15:07:02.146Z',
      updatedAt: '2024-11-07T15:07:02.992Z',
      number: 53445,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0946']
    },
    {
      _id: '"672cd7d3b27b06001c3e6dcf',
      status: 'done',
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2024-11-07T15:08:03.720Z',
      updatedAt: '2024-11-07T15:08:04.451Z',
      number: 53442,
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa0942']
    }
  ]
};

const mockPostOrderBurgerResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '672cd796b27b06001c3e6dce',
    status: 'done',
    name: 'Краторный минеральный бургер',
    createdAt: '2024-11-07T15:07:02.146Z',
    updatedAt: '2024-11-07T15:07:02.992Z',
    number: 53445,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0946']
  },
  name: 'David'
};

const mockPlacedOrders: TOrder[] = [
  {
    _id: '672cd796b27b06001c3e6dce',
    status: 'done',
    name: 'Краторный минеральный бургер',
    createdAt: '2024-11-07T15:07:02.146Z',
    updatedAt: '2024-11-07T15:07:02.992Z',
    number: 53445,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0946']
  },
  {
    _id: '"672cd7d3b27b06001c3e6dcf',
    status: 'done',
    name: 'Краторный spicy био-марсианский бургер',
    createdAt: '2024-11-07T15:08:03.720Z',
    updatedAt: '2024-11-07T15:08:04.451Z',
    number: 53442,
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa0942']
  }
];

describe('Тесты orderSlice', () => {
//postOrderBurger
    it('тест postOrderBurger.rejected', () => {
        const action = {
            type: postOrderBurger.rejected.type
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, error: 'Ошибка оформления заказа' };
        expect(stateTest).toEqual(stateCheck);
    });

    it('тест postOrderBurger.pending', () => {
        const action = {
            type: postOrderBurger.pending.type
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, orderRequest: true };
        expect(stateTest).toEqual(stateCheck);
    });
    
    it('тест postOrderBurger.fulfilled', () => {
        const action = {
            type: postOrderBurger.fulfilled.type,
            payload: mockPostOrderBurgerResponse
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, orderData: mockPostOrderBurgerResponse.order };
        expect(stateTest).toEqual(stateCheck);
    });
//fetchOrderByNumber
    it('тест fetchOrderByNumber.rejected', () => {
        const action = {
            type: fetchOrderByNumber.rejected.type
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, orderById: 'Ошибка при загрузке заказа' };
        expect(stateTest).toEqual(stateCheck);
    });

    it('тест fetchOrderByNumber.pending', () => {
        const action = {
            type: fetchOrderByNumber.pending.type
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    
    it('тест fetchOrderByNumber.fulfilled', () => {
        const action = {
            type: fetchOrderByNumber.fulfilled.type,
            payload: mockOrderResponse
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, orderData: mockOrderResponse.orders[0] };
        expect(stateTest).toEqual(stateCheck);
    });
//getPlacedOrders
    it('тест getPlacedOrders.rejected', () => {
        const action = {
            type: getPlacedOrders.rejected.type
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, error: 'Ошибка при загрузке заказа' };
        expect(stateTest).toEqual(stateCheck);
    });

    it('тест getPlacedOrders.pending', () => {
        const action = {
            type: getPlacedOrders.pending.type
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    
    it('тест getPlacedOrders.fulfilled', () => {
        const action = {
            type: getPlacedOrders.fulfilled.type,
            payload: mockPlacedOrders
        };
        const stateTest = orderSlice.reducer(initialState, action);
        const stateCheck: TOrderSlice = { ...initialState, orders: mockPlacedOrders };
        expect(stateTest).toEqual(stateCheck);
    });
})