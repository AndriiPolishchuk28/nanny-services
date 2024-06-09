import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PrivateHeader from '../PrivateHeader/PrivateHeader';

const PrivateLayout = () => {
  return (
    <>
      <PrivateHeader />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default PrivateLayout;
