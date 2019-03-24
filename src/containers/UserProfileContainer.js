import React from 'react';
import {connect} from 'react-redux';

class UserProfileContainer extends React.Component {

    render() {
        console.log('UserProfileContainer');
        return (
            <div className="row row-margin">
                <div className="col-lg-3">
                    <ul className="nav flex-column nav-margin-top-15">
                        <li className="nav-item">
                            <button type="button" className="mb-2 btn no-border btn-profile btn-outline-warning mr-2">
                                <span className="login-text">Account</span>
                            </button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="mb-2 btn no-border btn-profile btn-outline-warning mr-2">
                                <span className="login-text">Password</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-lg-6 col-sm-9">
                    <p className="profile-title">Account</p><br/>
                    <p>Username</p>
                    <input type="text" className="form-control form-control-lg mb-3"/>
                    <br/>
                    <p>Email</p>
                    <input type="text" className="form-control form-control-lg mb-3"/>
                    <br/>
                    <button type="button" className="mb-2 btn btn-warning mr-2">Update</button>
                    <br/>
                    <a>Detele my account</a>
                </div>
            </div>
        );
    }
}

export default connect(null, null) (UserProfileContainer);