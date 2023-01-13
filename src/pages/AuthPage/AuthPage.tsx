import React, {FC} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useAppSelector} from '../../hooks';
import {selectIsAuth} from '../../redux/auth/selectors';

const AuthPage: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const location = useLocation();
  const loginTabActive = location.pathname === '/auth/login';
  const signupTabActive = location.pathname === '/auth/signup';

  if (location.pathname === '/auth') {
    return <Navigate to={'/auth/login'} />;
  }

  if (isAuth) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <main className={'d-flex justify-content-center w-100 pt-5'}>
      <div className={'bg-white mt-3'} style={{width: 600}}>
        <Nav variant={'tabs'} defaultActiveKey={'/login'} fill={true}>
          <Nav.Item className={'text-center fs-5'}>
            <LinkContainer to={'/auth/login'}>
              <Nav.Link active={loginTabActive} className={loginTabActive ? 'fw-bold' : ''}>
                Log In
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item className={'text-center fs-5'}>
            <LinkContainer to={'/auth/signup'}>
              <Nav.Link active={signupTabActive} className={signupTabActive ? 'fw-bold' : ''}>
                Sign Up
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
        <div className={'border border-1 border-top-0 p-4 rounded-bottom'}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
