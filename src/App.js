import './App.css';
import { Home, MyFarm, Adventure, AnimalShop, ItemShop, Auction } from './pages';
import { useRoutes } from 'react-router-dom';

const user = "seungjae";

function App() {
  const element = useRoutes([
    { path: '/', element: <Home />},
    { path: '/myfarm', element: <MyFarm userId={user} />},
    { path: '/adventure', element: <Adventure />},
    { path: '/animalshop', element: <AnimalShop />},
    { path: '/itemshop', element: <ItemShop />},
    { path: '/auction', element: <Auction />}
  ]);

  return element;
}

export default App;
