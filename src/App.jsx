import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Home from './pages/Home/Home';
import Nannies from './pages/Nannies/Nannies';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors';
import { useEffect } from 'react';
import { currentUser } from './redux/auth/operations';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const isFetchingCurrentUser = useSelector(selectIsRefreshing);
  console.log(isFetchingCurrentUser);
  return (
    <Routes>
      {!isFetchingCurrentUser && (
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/nannies" element={<Nannies />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
      )}
    </Routes>
  );
}
export default App;
