import React from 'react';
import { NavLink } from 'react-router-dom';

import DrawerToggleButton from './SideDrawer/DrawerToggleButton';
import './MainNavigation.css';



const mainNavigation = props => (
  <header className="main-navigation">

    <nav className="main-navigation__navigation">
        <div className="main-navigation__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler}/>
        </div>

        <div className="main-navigation__logo"><h1>THE LOGO</h1></div>
        <div className="spacer" />
        <div className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/auth">Authenticate</NavLink>
                </li>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                </li>
            </ul>
        </div>
        
    </nav>
    
  </header>
);

export default mainNavigation;