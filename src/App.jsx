import { Route, Routes } from 'react-router-dom';
import SharedLayout from './components/SharedLayout/SharedLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Route>
    </Routes>
  );
}
export default App;
