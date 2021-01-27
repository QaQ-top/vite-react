import { RouteProps } from 'react-router-dom';
import Home from '@pages/home';

const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  }
]

export default routes;

