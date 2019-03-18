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

class App extends Component {
  constructor(props) {
    super(props);
  }

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
              <Route path="/hot" component={HotContainer}/>
              <Route path="/new" component={NewContainer}/>
              <Route path="/fresh" component={FavoritedContainer}/>
              {
                listCategory.map((elm, index) => {
                  let path = '/category/:id';
                  return (
                    <Route key={index} path={path} component={(props) => <CategoryDetailContainer key={index} {...props}/>}/>
                  );
                })
              }
              <Route path="/media/:id" component={MediaDetailContainer}/>
              <Route path="/search" component={(props) => <SearchMediaContainer dataSearch={dataSearch}/>}/>
            </Switch>
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
