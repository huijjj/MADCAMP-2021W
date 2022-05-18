import './App.css';
import { Auth, Home, MyFarm, Adventure, AnimalShop, ItemShop, Register} from './pages';
import { useRoutes } from 'react-router-dom';
import {useState} from 'react';
function App() {
  const [ userId, setUserId ]= useState("");

  const element = useRoutes([
    { path: '/', element: <Auth getId={setUserId} />},
    { path: '/myfarm', element: <MyFarm userId={userId} />},
    { path: '/adventure', element: <Adventure userId={userId} />},
    { path: '/animalshop', element: <AnimalShop userId={userId} />},
    { path: '/itemshop', element: <ItemShop userId={userId}  />},
    { path: '/register', element: <Register />},
    { path: '/home', element: <Home userId={userId} setUserId={setUserId} />}
  ]);

  return element;
}

export default App;
