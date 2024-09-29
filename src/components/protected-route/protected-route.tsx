import { Preloader } from '@ui';
import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { checkUserAuth, getUserData } from '../slices/authUserSlice';

//Определяю интерфейс для защищенного роута
type ProtectedRouteProps = {
  children: ReactNode; //позволяет компоненту принимать любые элементы, которые будут отрисованы внутри него
  ifNotAuth?: boolean; //указывает, должен ли компонент быть доступен только для неавторизованных пользователей
};

export const ProtectedRoute = ({
  children,
  ifNotAuth
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { userData, isAuthChecked } = useSelector(getUserData);

  if (!isAuthChecked) {
    //  Если состояние !isAuthChecked ещё не проверено отображается компонент Preloader
    return <Preloader />;
  }

  if (ifNotAuth && userData) {
    // Если аутентификация проверена, но пользователь не авторизован перенаправляю на страницу логина
    return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
  }
  if (!ifNotAuth && !userData) {
    //Когда только неавторизованный пользователь может получить доступ, но пользователь уже авторизован, происходит перенаправление на ранее запрашиваемый маршрут или на главную страницу, если маршрут не указан
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }
  return children; //При выполнении условий, отрисовываются компоненты children
};
