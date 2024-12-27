import React from 'react';
import MainSlider from '../components/MainSlider';
import BestItem from '../components/BestItem';
import FreshBox from '../components/FreshBox';
import Location from '../components/Location';



const Home = () => {
  return (
    <div>
      <MainSlider />
      <BestItem />
      <FreshBox />
      <Location />
    </div>
  );
};

export default Home;