import React, {FC} from 'react';
import {ProgressBar} from 'react-bootstrap';

interface DownloadProgressProps {
  animated: boolean;
  percentage: number;
}

const DownloadProgress: FC<DownloadProgressProps> = ({percentage, animated}) => {
  return (
    <div>
      <h3>Downloading {percentage}%</h3>
      <ProgressBar striped={animated} animated={animated} now={percentage} />
    </div>
  );
};

export default DownloadProgress;
