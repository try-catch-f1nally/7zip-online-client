import React, {FC} from 'react';
import {Container} from 'react-bootstrap';
import ArchiveForm from '../../components/ArchiveForm/ArchiveForm';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {selectIsAuth} from '../../redux/auth/selectors';

const ArchivePage: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={'/auth'} replace />;
  }

  return (
    <main>
      <Container>
        <section className={'pt-5'}>
          <ArchiveForm />
        </section>
      </Container>
    </main>
  );
};

export default ArchivePage;
