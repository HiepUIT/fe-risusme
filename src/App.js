import React, { Component } from 'react';
import './App.css';
import MenuContainer from './containers/MenuContainer';
import HeaderContainer from './containers/HeaderContainer';
import HotContainer from './containers/HotContainer';
import NewContainer from './containers/NewContainer';
import FavoritedContainer from './containers/FavoritedContainer';
import CategoryDetailContainer from './containers/CategoryDetailContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MediaDetailContainer from './containers/MediaDetailContainer';
import UserProfileContainer from './containers/UserProfileContainer';
import { connect } from 'react-redux';
import SearchMediaContainer from './containers/SearchMediaContainer';
import FooterContainer from './containers/FooterContainer';
import FollowContainer from './containers/FollowContainer';

class App extends Component {

  render() {
    var { listCategory } = this.props;
    var { dataSearch } = this.props;
    return (
      <BrowserRouter>
        <React.Fragment>
          <MenuContainer/>
          <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
            <HeaderContainer ref={this.child}/>
            <Switch>
              <Route path="/settings" component={UserProfileContainer}/>
              <Route exact path="/" component={NewContainer}/>
              <Route path="/hot/:id" component={HotContainer}/>
              <Route path="/follow/:id" component={FollowContainer}/>
              {/* <Route path="/new/:id" component={NewContainer}/> */}
              {
                listCategory.map((elm, index) => {
                  let path = '/category/:id';
                  return (
                    <Route key={index} path={path} component={(props) => <CategoryDetailContainer key={index} {...props}/>}/>
                  );
                })
              }
              <Route path="/media/:categoryId/:id" component={MediaDetailContainer}/>
              <Route path="/search" component={(props) => <SearchMediaContainer dataSearch={dataSearch}/>}/>
            </Switch>
            <FooterContainer/>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('app', state);
  return {
    listCategory: state.listCategoryReducer,
    dataSearch: state.searchReducer
  }
}
export default connect(mapStateToProps, null) (App);
