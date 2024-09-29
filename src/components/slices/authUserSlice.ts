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
  TRegisterData
} from '../../utils/burger-api';

// Создание асинхронных функций
export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const checkUserAuth = createAsyncThunk(
  'user/check',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

// Определяю интерфейс пользовательских данных
interface IAuthUser {
  userData: TUser | null; //Данные пользователя
  isAuthChecked: boolean; // Проверка авторизации
  isLoading: boolean; // Состояние загрузки
  error: string | null; // Состояние ошибки
}

// Определяю начальное состояние для хранилища пользовательских данных
const initialState: IAuthUser = {
  userData: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

// Создаю слайс
export const authUserSlice = createSlice({
  name: 'userData',
  initialState,
  selectors: {
    getUserData: (state) => state
  },
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Проверяю регистрацию
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'регистрация не удалась';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      // Логин
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = 'вход не удался';
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.userData = action.payload;
      })
      // Логаут
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.error = 'выход не удался';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = null;
      })
      // Получение данных пользователя
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'загрузка пользователя не удалась';
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      // Обновление данных пользователя
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = 'обновление пользователя неудалось';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      // Проверка данных пользователя
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = 'пользователь не зарегистрирован';
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      });
  }
});

// Экспортирую действия, селекторы и редюсер
export default authUserSlice.reducer;
export const { authChecked } = authUserSlice.actions;
export const { getUserData } = authUserSlice.selectors;
