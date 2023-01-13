import React from 'react';
import './scss/index.scss';
import {Route, Routes} from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage/MainPage';
import AuthPage from './pages/AuthPage/AuthPage';
import LogInForm from './components/LogInForm/LogInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import DownloadPage from './pages/DownloadPage/DownloadPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={'/download'} element={<DownloadPage />} />
        <Route path={'/archive'} element={<ArchivePage />} />
        <Route path={'/auth'} element={<AuthPage />}>
          <Route path={'login'} element={<LogInForm />} />
          <Route path={'signup'} element={<SignUpForm />} />
        </Route>
        <Route path="*" element={<ErrorPage title="This page doesn't exist" />} />
      </Route>
    </Routes>
  );
};

export default App;
