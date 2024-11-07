import { it, expect } from "@jest/globals";
import { getFeeds, feedSlice, TFeedSlice, initialState } from "./feedSlice";
import { TFeedsResponse } from '../../utils/burger-api';

//Создать тестовые значения
const mockFeedResponse: TFeedsResponse = {
  success: true,
  orders: [
    {
        "_id": "669785a3119d45001b4f9855",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0941",
            "643d69a5c3f7b9001cfa0942",
            "643d69a5c3f7b9001cfa093c"
        ],
        "status": "done",
        "name": "Краторный spicy био-марсианский бургер",
        "createdAt": "2024-11-07T15:28:16.467Z",
        "updatedAt": "2024-11-07T15:28:17.290Z",
        "number": 58870
    },
    {
        "_id": "643d69a5c3f7b9001cfa093d",
        "ingredients": [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0943",
            "643d69a5c3f7b9001cfa093e",
            "643d69a5c3f7b9001cfa093d"
        ],
        "status": "done",
        "name": "Space флюоресцентный люминесцентный бургер",
        "createdAt": "2024-11-07T15:31:04.403Z",
        "updatedAt": "2024-11-07T15:31:05.090Z",
        "number": 58871
    },
    {
        "_id": "672cdf70b27b06001c3e6dda",
        "ingredients": [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa093f",
            "643d69a5c3f7b9001cfa0944",
            "643d69a5c3f7b9001cfa093c"
        ],
        "status": "done",
        "name": "Краторный традиционный-галактический бессмертный бургер",
        "createdAt": "2024-11-07T15:40:32.739Z",
        "updatedAt": "2024-11-07T15:40:33.330Z",
        "number": 58873
    }
  ],
  total: 3,
  totalToday: 3
}

describe('Тесты FeedSlice', () => {
    it('тест getFeeds.rejected', () => {
        const action = {
            type: getFeeds.rejected.type
        };
        const stateTest = feedSlice.reducer(initialState, action);
        const stateCheck: TFeedSlice = { ...initialState, isLoading: false, error: 'Ошибка загрузки' };
        expect(stateTest).toEqual(stateCheck); 
    });

    it('тест getFeeds.pending', () => {
        const action = {
            type: getFeeds.pending.type
        };
        const stateTest = feedSlice.reducer(initialState, action);
        const stateCheck = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    
    it('тест getFeeds.fulfilled', () => {
        const action = {
            type: getFeeds.fulfilled.type,
            payload: mockFeedResponse
        };
        const stateTest = feedSlice.reducer(initialState, action);
        const stateCheck: TFeedSlice = {
            feed: {
                total: mockFeedResponse.total,
                totalToday: mockFeedResponse.totalToday
            }, 
            isLoading: false,
            orders: mockFeedResponse.orders,
            error: null
        };
        expect(stateTest).toEqual(stateCheck);
    });
})
