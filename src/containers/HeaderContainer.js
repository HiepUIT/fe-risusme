import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {searchMedia} from './../actions/actions';
import avatar from './../images/0.jpg';
import logo from './../images/logo.jpg';
import facebook from './../images/facebook.png';
import google from './../images/google.png';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import * as config from './../configs/configs';
import {loginAction} from './../actions/actions';
import * as constants from './../constants/constants';

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowModal: false,
            searchValue: '',
            redirectToSearch: false,
        }
    }

    updateSearchValue = (e) => {
        this.setState({searchValue: e.target.value});
    }

    doSearchMedia = (e) => {
        if(e.which === 13){
            this.setState({redirectToSearch: true});
            this.props.searchMedia(this.state.searchValue, 1);
        }
    }

    responseFacebook = (res) => {
        this.props.loginAction(res, constants.LOGIN_FB);
    }

    responseGoogle = (res) => {
        console.log('responseGoogle', res);
    }


    render() {
        let {redirectToSearch} = this.state;
        let {auth} = this.props;
        let authAvatar = avatar;
        let authName = "";
        if(typeof(auth.isAuth) != 'undefined' && auth.isAuth == true) {
            authAvatar = auth.user.picture.data.url;
            authName = auth.user.name;
        }
        if(redirectToSearch) return <Redirect to="/search"/>
        return (
            <div className="main-navbar sticky-top bg-white">
                <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                    <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                        <div className="input-group input-group-seamless ml-3">
                            <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-search" />
                            </div>
                            </div>
                            <input className="navbar-search form-control" 
                                onChange={this.updateSearchValue} 
                                onKeyPress={this.doSearchMedia}
                                type="text" placeholder="Search for something..." aria-label="Search" /> 
                        </div>
                    </div>
                    <ul className="navbar-nav border-left flex-row ">
                    {/* <li className="nav-item border-right dropdown notifications">
                        <a className="nav-link nav-link-icon text-center"  role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="nav-link-icon__wrapper">
                            <i className="material-icons">&#xE7F4;</i>
                            <span className="badge badge-pill badge-danger">2</span>
                        </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="/#">
                            <div className="notification__icon-wrapper">
                            <div className="notification__icon">
                                <i className="material-icons">&#xE6E1;</i>
                            </div>
                            </div>
                            <div className="notification__content">
                            <span className="notification__category">Analytics</span>
                            <p>Your website’s active users count increased by
                                <span className="text-success text-semibold">28%</span> in the last week. Great job!</p>
                            </div>
                        </a>
                        <a className="dropdown-item" >
                            <div className="notification__icon-wrapper">
                            <div className="notification__icon">
                                <i className="material-icons">&#xE8D1;</i>
                            </div>
                            </div>
                            <div className="notification__content">
                            <span className="notification__category">Sales</span>
                            <p>Last week your store’s sales count decreased by
                                <span className="text-danger text-semibold">5.52%</span>. It could have been worse!</p>
                            </div>
                        </a>
                        <a className="dropdown-item notification__all text-center" > View all Notifications </a>
                        </div>
                    </li> */}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown"  role="button" aria-haspopup="true" aria-expanded="false">
                            <img className="user-avatar rounded-circle mr-2" src={authAvatar} alt="User Avatar" />
                            <span className="d-none d-md-inline-block">{authName}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-small">
                            <Link className="dropdown-item" href="user-profile-lite.html" to="/settings">
                                <i className="material-icons">&#xE7FD;</i> Settings
                            </Link>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item text-danger" onClick={() => this.setState({isShowModal: true})}>
                                <i className="material-icons text-danger">&#xE879;</i> Login </a>
                        </div>
                    </li>
                    </ul>
                    <nav className="nav">
                        <a  className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center border-left" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
                            <i className="material-icons">&#xE5D2;</i>
                        </a>
                    </nav>
                </nav>
                <Modal show={this.state.isShowModal} onHide={() => this.setState({isShowModal: false})}>
                    <Modal.Body>
                        <div className="row">
                            <img className="img-logo-login" src={logo}/>
                        </div>
                        <div className="row">
                            <span className="m-auto login-text">Login</span>
                        </div>
                        <div className="row">
                            <span className="m-auto">Connect with a social network</span>
                        </div>
                        <br/>
                        <div className="row r-socical">
                            <FacebookLogin
                                appId={config.FB_ID}
                                fields="name,email,picture" 
                                textButton=""
                                cssClass="my-login-facebook"
                                icon={<img className="img-social-login" src={facebook}/>}
                                callback={this.responseFacebook}/>
                        </div>
                        <div className="row r-socical">
                            <GoogleLogin
                                clientId={config.GOOGLE_ID}
                                buttonText=""
                                render={
                                    (renderProps) => (<img onClick={renderProps.onClick} className="img-social-login" src={google}/>)
                                }
                                onSuccess={this.responseGoogle}
                            >
                            </GoogleLogin>
                        </div>
                        <div className="card-header border-top">
                            <h6 className="m-0 text-center" style={{paddingTop: '10px'}}>Login with your email address</h6>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="form-group">
                                <input className="form-control" type="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" placeholder="Password"/>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <button type="button" className="mb-2 btn btn-warning mr-2">Login</button>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="form-group">
                                        <strong className="text-muted d-block mb-2 text-right">Forgot password</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchData: state.searchReducer,
        auth: state.authReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchMedia: (title, page) => {
            dispatch(searchMedia(title, page));
        },
        loginAction: (auth, type) => {
            dispatch(loginAction(auth, type))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (HeaderContainer);