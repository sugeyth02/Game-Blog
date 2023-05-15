import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import './index.scss';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Paths } from './types/Paths';
const { LOGIN, HOME, GAME } = Paths;
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route element={<Layout />}>
          <Route path={HOME} element={<HomePage />} />
          <Route element={<ProtectedRoute redirectPath={LOGIN} />}>
            <Route path={GAME} element={<GamePage />} />
          </Route>
        </Route>
        <Route path='*' element={<p>Not Found: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
