
import { useRoutes } from 'react-router-dom';
import AdventureLobby from "./AdventureLobby";
import AdventureFloor from "./AdventureFloor";
import AdventureRoom from './AdventureRoom';

export default function Adventure() {
  const element = useRoutes([
    { path: '/lobby', element: <AdventureLobby />},
    { path: '/floor/:floor', element: <AdventureFloor />},
    { path: '/floor/:id/room', element: <AdventureRoom />},
  ]);

  return element;
}