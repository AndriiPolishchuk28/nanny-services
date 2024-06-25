import { useEffect } from 'react';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { errorToast } from '../../helpers/toast';

const PrivateRoute = ({ children, redirectTo = '/nannies' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      errorToast('You need to log in to access favorites page');
    }
  }, [isLoggedIn]);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
