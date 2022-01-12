import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ history, match, location }) {
  const navigate = useNavigate();

  const onClick = (target) => {
    // console.log(history, match, location);
    // history.push(`/${target}`);
    navigate(`/${target}`);
  }

  return (
    <div>
      <div onClick={(e) => {
        e.preventDefault();
        onClick("myfarm"); 
      }}>
        MyFarm
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("adventure");
      }}>
        Adventure
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("animalshop");
      }}>
        AnimalShop
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("itemshop");
      }}>
        ItemShop
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("auction");
      }}>
        Auction
      </div>
    </div>
  );
};

export default Home;