import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideDrawer.css';
import AuthContext from '../../../context/auth-context';

const sideDrawer = props => {
    let drawerClasses = ['side-drawer'];
    if (props.show) {
        drawerClasses.push('open')
    } 

    return (
        <AuthContext.Consumer>
            {(context) => {
                return (
                    <nav className={drawerClasses.join(' ')}>
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
                                    <React.Fragment>
                                        <li>
                                            <NavLink to="/bookings">Bookings</NavLink>
                                        </li>
                                        <li>
                                            <button onClick={context.logout}>Logout</button>
                                        </li>

                                    </React.Fragment>
                                    
                                )}
                            </ul>
                    </nav>
                );
            }}
        </AuthContext.Consumer>
        
    );
};


export default sideDrawer;