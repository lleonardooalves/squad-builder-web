import { createBrowserRouter } from 'react-router';
import App from '../App';
import { Home } from '../pages/Home/Home';
import { PlayerDetail } from '../pages/PlayerDetail/PlayerDetail';
import { NotFound } from '../pages/NotFound/NotFound';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'player/:id', element: <PlayerDetail /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
