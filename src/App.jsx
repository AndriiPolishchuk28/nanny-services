import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';
import Home from './pages/Home/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    </Routes>
  );
}
export default App;
