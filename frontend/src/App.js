import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';

import MainNavigation from './components/Navigation/MainNavigation';
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';
import BackDrop from './components/Navigation/Backdrop/Backdrop';

import './App.css';

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };


  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop   = <BackDrop click= {this.backdropClickHandler}/>;
    }


    return (
      <div style={{height: '100%'}}>
        <BrowserRouter>
        <React.Fragment>
          <MainNavigation drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <main className="main-content" >
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/bookings" component={BookingsPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
      </div>
      
    );
  }
}

export default App;
