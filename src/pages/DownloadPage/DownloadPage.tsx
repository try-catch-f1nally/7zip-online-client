import React, {FC, useEffect, useState} from 'react';
import DownloadProgress from '../../components/DownloadProgress/DownloadProgress';
import DownloadButton from '../../components/DownloadButton/DownloadButton';
import {Container} from 'react-bootstrap';
import {useAppSelector} from '../../hooks';
import {selectIsAuth, selectToken} from '../../redux/auth/selectors';
import {Navigate} from 'react-router-dom';
import {useGetProgressQuery} from '../../redux/archive/archive-api';
const DownloadPage: FC = () => {
  const [pollingInterval, setPollingInterval] = useState<number | undefined>(300);
  const [percentage, setPercentage] = useState<number>(0);
  const [status, setStatus] = useState<string | undefined>();
  const isSuccess = status === 'success';

  // @ts-ignore
  const {data} = useGetProgressQuery('get-progress', {
    pollingInterval
  });

  useEffect(() => {
    setStatus(data?.status);
    if (data?.percentage) {
      setPercentage(data.percentage);
    }
    if (data?.status === 'success') {
      setPercentage(100);
    }
    if (data?.status === 'success' || data?.status === 'error') {
      setPollingInterval(undefined);
    }
  }, [data]);

  const accessToken = useAppSelector(selectToken);
  const downloadArchive = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_API_URL}/archives/download`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const blob = await response.blob();
    const file = window.URL.createObjectURL(blob);
    window.location.assign(file);
  };

  const isAuth = useAppSelector(selectIsAuth);
  if (!isAuth) {
    return <Navigate to={'/auth'} replace />;
  }

  return (
    <main>
      <Container>
        <div className={'p-5 mb-2'}>
          <DownloadProgress percentage={percentage} animated={!isSuccess} />
        </div>
        <div className={'d-flex justify-content-center'}>
          <DownloadButton onClick={downloadArchive} disabled={!isSuccess} />
        </div>
      </Container>
    </main>
  );
};
export default DownloadPage;
