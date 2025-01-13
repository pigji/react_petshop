import React from 'react';
import MainSlider from '../components/MainSlider';
import BestItem from '../components/BestItem';
import FreshBox from '../components/FreshBox';
import Location from '../components/Location';
import Products from '../components/Products';



const Home = () => {
  return (
    <div>
      <MainSlider />
      <BestItem />
      <FreshBox />
      <Location/>
      <Products />
    </div>
  );
};

export default Home;