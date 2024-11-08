import { it, expect } from '@jest/globals';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {
  logoutApi,
  updateUserApi,
  getUserApi,
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  TUserResponse
} from '../../utils/burger-api';
import {
    getUser,
    checkUserAuth,
    loginUser,
    logoutUser,
    updateUser,
    registerUser,
    authUserSlice,
    getUserData,
    IAuthUser,
    initialState
} from './authUserSlice';

describe('тест authUserSlice', () => {
    const ERROR_REGISTER = 'регистрация не удалась';
    const ERROR_GET_USER = 'загрузка пользователя не удалась';
    const ERROR_LOGIN = 'вход не удался';
    const ERROR_LOGOUT = 'выход не удался';
    const ERROR_UPDATE_USER = 'обновление пользователя неудалось';
    const ERROR_CHECK_USER_AUTH = 'пользователь не зарегистрирован';
    beforeAll(() => {// устанавливаю глобальный объект localStorage с помощью мок-функций
        // создаю методы для теста
        global.localStorage = {
            setItem: jest.fn(),
            getItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
            key: jest.fn(),
            length: 0
        };
    });
    // мокаю куки и их значение для теста
    jest.mock('../../utils/cookie', () => ({
        setCookie: jest.fn(),
        getCookie: jest.fn(),
        deleteCookie: jest.fn(),
    }));
    // очищаю моки
    afterAll(() => {
        jest.clearAllMocks();
    });
    

    // создаю ложные данные пользователя для тестов
    const mockUserResponse: TUserResponse = {
        success: true,
        user: {
          email: 'david@yandex.ru',
          name: 'David'
        }
    };
    // Регистрация
    it('тест userRegister.rejected', () => {
        const action = {
            type: registerUser.rejected.type
          };
          const stateTest = authUserSlice.reducer(initialState, action);
          const stateCheck: IAuthUser = { ...initialState, error: ERROR_REGISTER };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест userRegister.pending', () => {
        const action = {
            type: registerUser.pending.type
          };
          const stateTest = authUserSlice.reducer(initialState, action);
          const stateCheck: IAuthUser = { ...initialState, isLoading: true };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест userRegister.fulfilled', () => {
        const action = {
            type: registerUser.fulfilled.type,
            payload: mockUserResponse
          };
          const stateTest = authUserSlice.reducer(initialState, action);
          const stateCheck: IAuthUser = { ...initialState, userData: mockUserResponse.user };
          expect(stateTest).toEqual(stateCheck);
    });
    // getUser
    it('тест getUser.rejected', () => {
        const action = {
            type: getUser.rejected.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, error: ERROR_GET_USER };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест getUser.pending', () => {
        const action = {
            type: getUser.pending.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест getUser.fulfilled', () => {
        const action = {
            type: getUser.fulfilled.type,
            payload: mockUserResponse
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, userData: mockUserResponse.user, isAuthChecked: true };
        expect(stateTest).toEqual(stateCheck);
    });
    // Логин
    it('тест loginUser.rejected', () => {
        const action = {
            type: loginUser.rejected.type
          };
          const stateTest = authUserSlice.reducer(initialState, action);
          const stateCheck: IAuthUser = { ...initialState, error: ERROR_LOGIN };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест loginUser.pending', () => {
        const action = {
            type: loginUser.pending.type
          };
          const stateTest = authUserSlice.reducer(initialState, action);
          const stateCheck: IAuthUser = { ...initialState, isLoading: true };
          expect(stateTest).toEqual(stateCheck);
    });
    it('тест loginUser.fulfilled', () => {
        const action = {
            type: loginUser.fulfilled.type,
            payload: mockUserResponse.user
          };
          const stateTest = authUserSlice.reducer(initialState, action);
          const stateCheck: IAuthUser = { ...initialState, userData: mockUserResponse.user, isAuthChecked: true };
          expect(stateTest).toEqual(stateCheck);
    });
// Логаут
    it('тест logoutUser.rejected', () => {
        const action = {
            type: logoutUser.rejected.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, error: ERROR_LOGOUT, isAuthChecked: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест logoutUser.pending', () => {
        const action = {
            type: logoutUser.pending.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест logoutUser.fulfilled', () => {
        const action = {
            type: logoutUser.fulfilled.type,
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = initialState;
        expect(stateTest).toEqual(stateCheck);
    });
// обновление данных
    it('тест updateUser.rejected', () => {
        const action = {
            type: updateUser.rejected.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, error: ERROR_UPDATE_USER };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест updateUser.pending', () => {
        const action = {
            type: updateUser.pending.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест updateUser.fulfilled', () => {
        const action = {
            type: updateUser.fulfilled.type,
            payload: mockUserResponse
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, userData: mockUserResponse.user };
        expect(stateTest).toEqual(stateCheck);
    });
// Проверка данных пользователя
    it('тест checkUserAuth.rejected', () => {
        const action = {
            type: checkUserAuth.rejected.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, error: ERROR_CHECK_USER_AUTH, isAuthChecked: false };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест checkUserAuth.pending', () => {
        const action = {
            type: checkUserAuth.pending.type
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, isLoading: true };
        expect(stateTest).toEqual(stateCheck);
    });
    it('тест checkUserAuth.fulfilled', () => {
        const action = {
            type: checkUserAuth.fulfilled.type,
            payload: mockUserResponse
        };
        const stateTest = authUserSlice.reducer(initialState, action);
        const stateCheck: IAuthUser = { ...initialState, isAuthChecked: true };
        expect(stateTest).toEqual(stateCheck);
    });
});