import React from 'react';
import datafresh from '../data/datafresh';
import { Link } from 'react-router-dom';
import './FreshBox.scss';
import Card from './Card';


const FreshBox = () => {

  return (
    <div className='freshbox'>
      <h2>Hello Fresh Box</h2>
      <p>We save you serious time</p>
      <div className="freshboxWrap">  {/* map함수를 사용하여 datafresh.js에 있는 데이터를 불러와서 뿌림 */}
        
        <Card datafresh={datafresh} />
        
      </div>
    </div>
  );
};

export default FreshBox;