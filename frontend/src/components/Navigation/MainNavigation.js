import React from 'react';
import { NavLink } from 'react-router-dom';

import DrawerToggleButton from './SideDrawer/DrawerToggleButton';

import AuthContext from '../../context/auth-context';
import './MainNavigation.css';



const mainNavigation = props => (
  <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <nav className="main-navigation__navigation">
                        <div className="main-navigation__toggle-button">
                            <DrawerToggleButton click={props.drawerClickHandler}/>
                        </div> 
                        <div className="main-navigation__logo"><h1>THE LOGO</h1></div>
                        <div className="spacer" />
                        <div className="main-navigation__items">
                            <ul>
                                {!context.token && (
                                    <li>
                                        <NavLink to="/auth">Authenticate</NavLink>
                                    </li>
                                )}
                                <li>
                                    <NavLink to="/events">Events</NavLink>
                                </li>
                                {context.token && (
                                    <li>
                                        <NavLink to="/bookings">Bookings</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>    
                </header>
            );}
        }
  </AuthContext.Consumer>  
  
);

export default mainNavigation;