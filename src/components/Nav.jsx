import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';  //링크태그
import { RiMenu3Fill } from "react-icons/ri"; //아이콘
import { IoCloseSharp } from "react-icons/io5"; //아이콘
import $ from 'jquery'; //리액트 제이쿼리


const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const activeStyle = {
    color : 'cadetblue'
  }
  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
    $('.mobile-header-drop').slideToggle(500)
  }

  return (
    <div className='header'>
      <div className="header-inner">
        <div className="logo">
          <Link to="/" >
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
          </Link>
        </div>
        <div className="nav">
          <ul className='loginAndSignup'>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/signup" >SignUp</Link></li>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/about" >About</Link></li>
          </ul>
          {/* <ul className='menu'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
          </ul> */}
        </div>
        <div className="movieNav">
          <span>
            {
              menuOpen ? (<RiMenu3Fill onClick={toggleMenu} />) : (<IoCloseSharp onClick={toggleMenu } />)
            }
          </span>
          <div className={`mobile-header-drop ${menuOpen ? '' : 'open'}`}>
            <div>
              <div className="mobile-header-nav">
                <div className="mobile-header-menu">
                  <Link to="/" className='logoLink' >
                    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="logo" />
                  </Link>
                  <ul>
                    <li>
                      <NavLink to="/" style={({isActive}) => (isActive ? activeStyle:undefined)}>Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/about" style={({isActive}) => (isActive ? activeStyle:undefined)}>About</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="mobile-header-loginJoin">
                  <ul>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link Link to="/signup">SignUp</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;