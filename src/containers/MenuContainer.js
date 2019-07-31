import React from 'react';
import * as configs from './../configs/configs';
import { Link } from "react-router-dom";
import ListCategoryContainer from './../containers/ListCategoryContainer';
import logo from './../images/logo.jpg';
import hot from './../images/hot.jpg';
import follow from './../images/follow.png';
import home from './../images/home.png'

class MenuContainer extends React.Component {
    render() {
        return (
            <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
                <div className="main-navbar">
                <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap p-0">
                    <a className="navbar-brand w-100 mr-0" href={configs.HOME_PAGE} style={{lineHeight: '35px'}}>
                    <div className="d-table m-auto">
                        <img id="main-logo" className="d-inline-block align-top mr-1" style={{maxWidth: '35px'}} src={logo} alt="Shards Dashboard" />
                        <span className="d-none d-md-inline ml-1" style={{fontSize: '2rem', color: 'black'}}>Risusme</span>
                    </div>
                    </a>
                    <a className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
                        <i className="material-icons">&#xE5C4;</i>
                    </a>
                </nav>
                </div>
                <form action="#" className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
                    <div className="input-group input-group-seamless ml-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-search" />
                            </div>
                        </div>
                        <input className="navbar-search form-control" type="text" placeholder="Search for something..." aria-label="Search" /> 
                    </div>
                </form>
                <div className="nav-wrapper">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="no-border menu-link-item nav-link" to="/">
                                <img alt="" className="img-icon" src={home}/>
                                <span className="menu-text">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="no-border menu-link-item nav-link" to="/hot/0">
                                <img alt="" className="img-icon" src={hot}/>
                                <span className="menu-text">Hot</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="menu-link-item nav-link" to="/follow/0">
                                <img alt="" className="img-icon" src={follow}/>
                                <span className="menu-text">Following</span>
                            </Link>
                        </li>
                    </ul>
                    <p className="category-style">SECTIONS</p>
                    <ListCategoryContainer/>
                </div>
            </aside>
        );
    }
}

export default MenuContainer;