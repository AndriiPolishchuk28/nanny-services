import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Home from './pages/Home/Home';
import Nannies from './pages/Nannies/Nannies';
import PrivateLayout from './components/PrivateLayout/PrivateLayout';
import Favorites from './pages/Favorites/Favorites';
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
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {!isFetchingCurrentUser && <Route index element={<Home />} />}
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/nannies" element={<Nannies />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>

      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  );
}
export default App;
