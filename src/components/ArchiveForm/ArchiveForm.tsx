import React, {FC, useState} from 'react';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import DropzoneBox from '../DropzoneBox/DropzoneBox';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {useCreateMutation} from '../../redux/archive/archive-api';
import {CreateArchiveBody} from '../../redux/archive/types';

const ArchiveForm: FC = () => {
  const navigate = useNavigate();
  const [create, {isLoading}] = useCreateMutation();
  const archiveFormats = ['zip', '7z', 'wim', 'tar', 'tar.gz', 'tar.xz', 'tar.bz2'];
  const [showPasswordField, setShowPasswordField] = useState(false);
  const validationSchema = Yup.object().shape({
    files: Yup.array().min(1, 'Please select at least one file')
  });

  const initialValues: CreateArchiveBody = {
    files: [],
    format: 'zip'
  };

  async function submitHandler(values: CreateArchiveBody) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (key !== 'files') {
        formData.append(key, value);
      }
    }
    values.files.forEach((file) => formData.append('files[]', file));
    await create(formData);
    navigate('/download');
  }

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      initialValues={initialValues}
    >
      {({handleSubmit, handleChange, values, touched, errors, setFieldValue}) => (
        <Form noValidate onSubmit={handleSubmit}>
          <h4 className={'mb-4'}>1. Select files to archive:</h4>
          <DropzoneBox setFieldValue={setFieldValue} invalidMessage={errors.files} />
          <h4 className={'mt-5 mb-3'}>2. Choose archive format</h4>
          <div>
            {archiveFormats.map((format) => (
              <Form.Check
                id={`${format}-format`}
                key={format}
                label={format}
                type={'radio'}
                name={'format'}
                value={format}
                onChange={handleChange}
                isInvalid={touched.format && !!errors.format}
                className={'fs-5 me-5 py-2'}
                defaultChecked={format === 'zip'}
                inline
              />
            ))}
          </div>
          <h4 className={'mt-5 mb-3'}>3. Specify the password to the archive, if needed</h4>
          <Form.Group>
            <InputGroup style={{width: 500}}>
              <Form.Control
                name={'password'}
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
                type={showPasswordField ? 'text' : 'password'}
                placeholder={'Password'}
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
          <Button size={'lg'} type={'submit'} className={'px-5 d-block m-auto mt-5'}>
            Save all as {values.format.toUpperCase()}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ArchiveForm;
