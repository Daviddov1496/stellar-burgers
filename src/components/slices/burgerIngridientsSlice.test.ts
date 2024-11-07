import { it, expect } from '@jest/globals';
import { TIngredient, TConstructorIngredient, TTabMode } from '../../utils/types';
import { IBurgerIngredients, getBurgerIngridients, burgerIngredientsSlice, initialState } from './burgerIngridientsSlice';

//Создать тестовые значения ингридиентов
const bunIngridientTest: TIngredient = {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_mobile:"https://code.s3.yandex.net/react/code/bun-02-large.png",
}

const mainIngridientTest: TIngredient = {
    _id: "643d69a5c3f7b9001cfa0941",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
}

const sauceIngridientTest: TIngredient = {
    _id: "643d69a5c3f7b9001cfa0942",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
}

describe('тесты burgerIngredientsSlice', () => {
    // мокаю состояние
    const mockIngredientState: IBurgerIngredients = {...initialState, ingredients: [mainIngridientTest, sauceIngridientTest]};

    it('тест getBurgerIngridients.rejected', () => {
        const action = {
            type: getBurgerIngridients.rejected.type,
            error: 'ingredients error'
          };
          const stateTest = burgerIngredientsSlice.reducer(initialState, action);
          const stateCheck: IBurgerIngredients = { ...initialState, error: 'ingredients error', isLoading: false };
          expect(stateTest).toEqual(stateCheck);
    });

    it('тест getBurgerIngridients.pending', () => {
        const action = {
            type: getBurgerIngridients.pending.type
          };
          const stateTest = burgerIngredientsSlice.reducer(initialState, action);
          const stateCheck: IBurgerIngredients = { ...initialState, isLoading: true, error: null };
          expect(stateTest).toEqual(stateCheck);
    });

    it('тест getBurgerIngridients.fulfilled', () => {
        const action = {
            type: getBurgerIngridients.fulfilled.type,
            payload: mockIngredientState.ingredients
          };
          const stateTest = burgerIngredientsSlice.reducer(initialState, action);
          const stateCheck = { ingredients: mockIngredientState.ingredients, isLoading: false, error: null};
          expect(stateTest).toEqual(stateCheck);
    });
})