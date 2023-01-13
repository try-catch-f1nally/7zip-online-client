import React, {FC} from 'react';
import {useAppSelector} from '../../hooks';
import {Navigate} from 'react-router-dom';
import {selectIsAuth} from '../../redux/auth/selectors';

const MainPage: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={'/auth'} replace />;
  }

  return <Navigate to={'/archive'} replace />;
};

export default MainPage;
