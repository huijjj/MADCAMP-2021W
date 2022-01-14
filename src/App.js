import './App.css';
import { Home, MyFarm, Adventure, AnimalShop, ItemShop, Auction } from './pages';
import { useRoutes } from 'react-router-dom';

const id = "seungjae";

function App() {
  const element = useRoutes([
    { path: '/', element: <Home />},
    { path: '/myfarm', element: <MyFarm />},
    { path: '/adventure', element: <Adventure id={id} />},
    { path: '/animalshop', element: <AnimalShop />},
    { path: '/itemshop', element: <ItemShop />},
    { path: '/auction', element: <Auction />}
  ]);

  return element;
}

export default App;
