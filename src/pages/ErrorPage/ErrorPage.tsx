import React, {FC} from 'react';
import {Container} from 'react-bootstrap';

interface ErrorPageProps {
  title?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({title = 'Oops, something went wrong...'}) => {
  return (
    <Container>
      <h1 className={'text-center'}>{title}</h1>
    </Container>
  );
};

export default ErrorPage;
