import React from 'react';
import { FaDog } from "react-icons/fa"; //리액트 아이콘

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="foot-addr">
          <div className="footLogo"><FaDog /> PET</div>
          <address>경기도 안산시 상록구 이동 716-8번지 KR 코로스프라자 1층 118호</address>
          <div className="copy">
            &copy; 2024 All Copy right ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;