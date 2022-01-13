import './App.css';
import { Auth, Home, MyFarm, Adventure, AnimalShop, ItemShop, Auction} from './pages';
import { useRoutes } from 'react-router-dom';

function App() {
  const  REST_API_KEY = "abeebb8ce837efc00481401793e9cc6b";
  const REDIRECT_URI = "http://192.249.18.138/oauth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const element = useRoutes([
    { path: '/', element: <Auth />},
    { path: '/myfarm', element: <MyFarm />},
    { path: '/adventure', element: <Adventure />},
    { path: '/animalshop', element: <AnimalShop />},
    { path: '/itemshop', element: <ItemShop />},
    { path: '/auction', element: <Auction />},
    { path: '/home', element: <Home />}
  ]);

  return element;
}

export default App;
