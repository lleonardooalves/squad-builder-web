import { createBrowserRouter } from 'react-router';
import App from '../App';
import { Home } from '../pages/Home/Home';
import { PlayerDetail } from '../pages/PlayerDetail/PlayerDetail';
import { NotFound } from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'player/:id', element: <PlayerDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
