import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Button, Form, InputGroup, Spinner} from 'react-bootstrap';
import {useAppDispatch} from '../../hooks';
import {setEmail} from '../../redux/auth/slice';
import {useRegisterMutation} from '../../redux/auth/auth-api';
import {SignupBody} from '../../redux/auth/types';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const SignUpForm: FC = () => {
  const dispatch = useAppDispatch();
  const [register, {error, isLoading}] = useRegisterMutation();
  const [showPasswordField, setShowPasswordField] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email!').required('Please enter your email address.'),
    password: Yup.string().min(5, 'Too short!').required('Please enter password.'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords don't match.")
      .required('Confirm your password.'),
    userAgree: Yup.bool().oneOf([true], 'Must be accepted.')
  });

  const initialValues: SignupBody = {
    email: '',
    password: '',
    passwordConfirm: '',
    userAgree: false
  };

  async function submitHandler(values: SignupBody) {
    dispatch(setEmail(values.email));
    await register(values);
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
          </Form.Group>
          <Form.Group className={'mb-3'}>
            <Form.Label className={'fs-5'}>
              Repeat password:<span className={'text-danger'}>*</span>
            </Form.Label>
            <Form.Control
              name={'passwordConfirm'}
              size={'lg'}
              value={values.passwordConfirm}
              onChange={handleChange}
              isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
              type={'password'}
              placeholder={'********'}
              required
            />
            <Form.Control.Feedback type={'invalid'}>{errors.passwordConfirm}</Form.Control.Feedback>
          </Form.Group>
          <Form.Check
            name={'userAgree'}
            checked={values.userAgree}
            onChange={handleChange}
            isInvalid={touched.userAgree && !!errors.userAgree}
            feedback={errors.userAgree}
            feedbackType={'invalid'}
            id={'user-agree-checkbox'}
            type={'checkbox'}
            label={'I have read and agree to 7-Zip Online Terms of Service and Privacy Policy.'}
            required
          />
          {error && 'data' in error && <ErrorMessage message={error.data.message} />}
          <Button
            size={'lg'}
            type={'submit'}
            className={'px-5 d-block m-auto mt-2'}
            disabled={isLoading}
          >
            Sign Up
            {isLoading && <Spinner className="ms-2" animation="border" variant="dark" size="sm" />}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
