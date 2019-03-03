import React, { Component } from 'react';
import './App.css';
import MenuContainer from './containers/MenuContainer';
import HeaderContainer from './containers/HeaderContainer';
import HotContainer from './containers/HotContainer';
import NewContainer from './containers/NewContainer';
import FreshContainer from './containers/FreshContainer';
import FunnyContainer from './containers/FunnyContainer';
import AnimalContainer from './containers/AnimalContainer';
import SportContainer from './containers/SportContainer';
import TipsContainer from './containers/TipsContainer';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuContainer/>
          <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
            <HeaderContainer/>
            <Route path="/hot" component={HotContainer}/>
            <Route path="/new" component={NewContainer}/>
            <Route path="/fresh" component={FreshContainer}/>
            <Route path="/funny" component={FunnyContainer}/>
            <Route path="/animal" component={AnimalContainer}/>
            <Route path="/sport" component={SportContainer}/>
            <Route path="/tips" component={TipsContainer}/>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
