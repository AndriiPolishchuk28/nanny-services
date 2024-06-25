import { useEffect } from 'react';
import { selectId } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { errorToast } from '../../helpers/toast';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const id = useSelector(selectId);

  useEffect(() => {
    if (!id) {
      errorToast('You need to log in to access favorites page');
    }
  }, [id]);
  return id ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
