import { it, expect } from '@jest/globals';
import { TIngredient, TConstructorIngredient, TTabMode } from '@utils-types';
import {IBurgerConstructor, addIngredient, burgerConstructorSlice, changeIngredient, deleteIngredient, emptyIngridient, initialState } from './burgerConstructionSlice';

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

//изначальное состояние бургера
const burgerState = {
    bun: { ...bunIngridientTest, id: '1' },
    ingredients: [
      { ...mainIngridientTest, id: '2' },
      { ...sauceIngridientTest, id: '3' }
    ]
};

describe('Тесты добавления ингридиентов', () => {
    it('тест пустого конструктора', () => {
        const testState = burgerConstructorSlice.reducer(undefined, { type: '' });
        expect(testState).toEqual(initialState);
    });
    it('тест добавления булки', () => {
        const testState = burgerConstructorSlice.reducer(initialState, addIngredient(bunIngridientTest));
        expect(testState.bun).toEqual(expect.objectContaining(bunIngridientTest));
    });
    it('тест добавления котлеты', () => {
        const testState = burgerConstructorSlice.reducer(initialState, addIngredient(mainIngridientTest));
        expect(testState.ingredients[0]).toEqual(expect.objectContaining(mainIngridientTest));
    });
    it('тест добавления соуса', () => {
        const testState = burgerConstructorSlice.reducer(initialState, addIngredient(sauceIngridientTest));
        expect(testState.ingredients[0]).toEqual(expect.objectContaining(sauceIngridientTest));
    });
});

describe('Тесты удаления ингридиентов', () => {
    it('тест удаления котлеты', () => {
        const testState = burgerConstructorSlice.reducer(burgerState, deleteIngredient('2'));
        expect(testState.ingredients).toHaveLength(1);
        expect(testState.ingredients).not.toContain(mainIngridientTest)
    });
    it('тест удаления соуса', () => {
        const testState = burgerConstructorSlice.reducer(burgerState, deleteIngredient('3'));
        expect(testState.ingredients).toHaveLength(1);
        expect(testState.ingredients).not.toContain(sauceIngridientTest)
    });
});

describe('Тесты изменения порядка ингридиентов', () => {
    it('перемещаю ингридиент с 3 на 2 позицию', () => {
    const testState = burgerConstructorSlice.reducer(burgerState, changeIngredient({ from: 1, to: 0 }));
    expect(testState.ingredients).toEqual([burgerState.ingredients[1], burgerState.ingredients[0]]);   
    })
});
