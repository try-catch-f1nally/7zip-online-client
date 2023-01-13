import React, {FC} from 'react';
import {Button, Container, Navbar, Spinner} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {selectEmail, selectIsAuth} from '../../redux/auth/selectors';
import {useLogoutMutation} from '../../redux/auth/auth-api';

const Header: FC = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectIsAuth);
  const email = useAppSelector(selectEmail);
  const [logout, {isLoading}] = useLogoutMutation();

  async function logoutHandler() {
    await logout();
    navigate('/');
  }

  return (
    <Navbar bg={'dark'} expand={'md'} className="fixed-top">
      <Container>
        <LinkContainer to={'/'} className={'text-white'}>
          <Navbar.Brand className={'fs-4'}>
            <span className={'text-primary fw-bold'}>7-Zip</span> Online
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className={'d-flex justify-content-end align-items-center w-100'}>
            {isAuth ? (
              <>
                <i className={'bi-person-fill text-light fs-4 me-1'} />
                <span className={'text-light opacity-75 fs-5 me-3'}>{email}</span>
                <Button variant={'outline-primary'} onClick={logoutHandler} disabled={isLoading}>
                  Log Out &nbsp;
                  <i className={'bi-box-arrow-right'} />
                  {isLoading && (
                    <Spinner className="ms-2" animation="border" variant="dark" size="sm" />
                  )}
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to={'/auth/login'}>
                  <Button className={'me-3'}>Log In</Button>
                </LinkContainer>
                <LinkContainer to={'/auth/signup'}>
                  <Button variant={'outline-primary'}>Sign Up</Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
