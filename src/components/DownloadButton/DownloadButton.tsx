import React, {FC} from 'react';
import {Button} from 'react-bootstrap';

interface DownloadButtonProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const DownloadButton: FC<DownloadButtonProps> = ({onClick, disabled = false}) => {
  return (
    <Button size={'lg'} disabled={disabled} onClick={onClick}>
      Download <i className={'bi-download'} />
    </Button>
  );
};

export default DownloadButton;
