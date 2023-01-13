import React, {FC} from 'react';

const ErrorMessage: FC<{message: string}> = ({message}) => {
  return <div className="text-danger bi-exclamation-circle"> {message}</div>;
};

export default ErrorMessage;
