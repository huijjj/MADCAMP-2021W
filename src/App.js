import './App.css';
import { Auth, Home, MyFarm, Adventure, AnimalShop, ItemShop, Auction, Register} from './pages';
import { useRoutes } from 'react-router-dom';
import {useState} from 'react';
function App() {
  const [ userId, setUserId ]= useState("");

  const element = useRoutes([
    { path: '/', element: <Auth getId={setUserId} />},
    { path: '/myfarm', element: <MyFarm userId={userId} />},
    { path: '/adventure', element: <Adventure />},
    { path: '/animalshop', element: <AnimalShop />},
    { path: '/itemshop', element: <ItemShop />},
    { path: '/auction', element: <Auction />},
    { path: '/register', element: <Register />},
    { path: '/home', element: <Home userId={userId} />}
  ]);

  return element;
}

export default App;
