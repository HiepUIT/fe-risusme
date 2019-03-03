import React from 'react';
import * as configs from './../configs/configs';
import { Link } from "react-router-dom";

class MenuContainer extends React.Component {
    render() {
        return (
            <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
                <div className="main-navbar">
                <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap border-bottom p-0">
                    <a className="navbar-brand w-100 mr-0" href={configs.HOME_PAGE} style={{lineHeight: '35px'}}>
                    <div className="d-table m-auto">
                        <img id="main-logo" className="d-inline-block align-top mr-1" style={{maxWidth: '35px'}} src="./images/logo.jpg" alt="Shards Dashboard" />
                        <span className="d-none d-md-inline ml-1" style={{fontSize: '2rem'}}>Risusme</span>
                    </div>
                    </a>
                    <a  className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
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
                    <p className="category-style">POPULAR</p>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to="/hot">
                                <img className="img-icon" src="./images/hot.jpg"/>
                                <span className="menu-text">Hot</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/new">
                                <img className="img-icon" src="./images/new.jpg"/>
                                <span className="menu-text">New</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/fresh">
                                <img className="img-icon" src="./images/fresh.jpg"/>
                                <span className="menu-text">Fresh</span>
                            </Link>
                        </li>
                    </ul>
                    <p className="category-style">SECTIONS</p>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" to="/funny">
                                <img className="img-icon" src="./images/funny.jpg"/>
                                <span className="menu-text">Funny</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animal">
                                <img className="img-icon" src="./images/animals.jpg"/>
                                <span className="menu-text">Animal</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sport">
                                <img className="img-icon" src="./images/sport.jpg"/>
                                <span className="menu-text">Sport</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tips">
                                <img className="img-icon" src="./images/tips.jpg"/>
                                <span className="menu-text">Tips</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default MenuContainer;