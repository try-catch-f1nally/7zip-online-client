import React, {CSSProperties, FC, useCallback, useState} from 'react';

import {CloseButton, Form} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import {FormikErrors} from 'formik';

interface DropzoneBoxProps {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  invalidMessage: string | string[] | FormikErrors<Blob>[] | undefined;
}

const DropzoneBox: FC<DropzoneBoxProps> = ({setFieldValue, invalidMessage}) => {
  const [files, setFiles] = useState<Blob[]>([]);

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    setFiles(acceptedFiles);
    setFieldValue('files', acceptedFiles, true);
  }, []);

  const resetFiles = () => {
    setFiles([]);
    setFieldValue('files', [], true);
  };

  const baseStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#949494',
    borderStyle: 'dashed',
    backgroundColor: '#fffaf6',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const focusedStyle = {
    borderColor: '#ffc107'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const getStyle = (isFocused: boolean, isDragAccept: boolean, isDragReject: boolean) => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  });

  const getMessage = (isDragActive: boolean) => {
    if (isDragActive) {
      return 'Drop the files here ...';
    } else if (files?.length) {
      return `Selected ${files.length} file` + (files.length > 1 ? 's' : '');
    } else {
      return 'Drag-n-Drop some files here, or click to select files';
    }
  };

  return (
    <Dropzone onDrop={onDrop} disabled={!!files?.length}>
      {({getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject}) => (
        <>
          <div
            {...getRootProps({
              style: getStyle(isFocused, isDragAccept, isDragReject),
              disabled: true
            })}
          >
            <input {...getInputProps()} />
            <div className={'fs-5 py-4'}>
              {getMessage(isDragActive)}&nbsp;
              {!!files?.length && <CloseButton className={'fs-6'} onClick={resetFiles} />}
            </div>
          </div>
          {typeof invalidMessage === 'string' && (
            <div className={'text-danger'}>{invalidMessage}</div>
          )}
        </>
      )}
    </Dropzone>
  );
};

export default DropzoneBox;
