import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Form, InputGroup, Spinner} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {setEmail} from '../../redux/auth/slice';
import {useLoginMutation} from '../../redux/auth/auth-api';
import {LoginBody} from '../../redux/auth/types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LogInForm: FC = () => {
  const dispatch = useAppDispatch();
  const [login, {isLoading, error}] = useLoginMutation();
  const [showPasswordField, setShowPasswordField] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Please enter your email address.'),
    password: Yup.string().min(5, 'Too short!').required('Please enter your password.')
  });

  const initialValues: LoginBody = {
    email: '',
    password: ''
  };

  async function submitHandler(values: LoginBody) {
    dispatch(setEmail(values.email));
    await login(values);
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      initialValues={initialValues}
    >
      {({handleSubmit, handleChange, values, touched, errors}) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className={'mb-4'}>
            <Form.Label className={'fs-5'}>Email:</Form.Label>
            <Form.Control
              name={'email'}
              size={'lg'}
              value={values.email}
              onChange={handleChange}
              isInvalid={touched.email && !!errors.email}
              type={'email'}
              placeholder={'youremail@example.com'}
              required
            />
            <Form.Control.Feedback type={'invalid'}>{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={'mb-4'}>
            <Form.Label className={'fs-5'}>Password:</Form.Label>
            <InputGroup>
              <Form.Control
                name={'password'}
                size={'lg'}
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
                type={showPasswordField ? 'text' : 'password'}
                placeholder={'********'}
                required
                style={{width: '180px'}}
              />
              <Button
                className={
                  'border border-1 rounded-end px-3 ' +
                  (showPasswordField ? 'bi-eye' : 'bi-eye-slash')
                }
                variant={'light'}
                onClick={() => setShowPasswordField((prevState) => !prevState)}
              />
              <Form.Control.Feedback type={'invalid'}>{errors.password}</Form.Control.Feedback>
            </InputGroup>
            <Link to={'/auth/password-recovery'}>Forgot Password?</Link>
          </Form.Group>
          {error && 'data' in error && <ErrorMessage message={error.data.message} />}
          <Button
            size={'lg'}
            type={'submit'}
            className={'px-5 d-block m-auto'}
            disabled={isLoading}
          >
            Log In
            {isLoading && <Spinner className="ms-2" animation="border" variant="dark" size="sm" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInForm;
