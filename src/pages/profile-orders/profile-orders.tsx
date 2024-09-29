import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getPlacedOrders,
  selectOrdersList
} from '../../components/slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrdersList);

  useEffect(() => {
    dispatch(getPlacedOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
