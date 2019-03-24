import React from 'react';
import { Link } from "react-router-dom";

class LisCategoryComponent extends React.Component {

    render() {
        let linkTo = '/category/' + this.props.id;
        return (
            <li className="nav-item">
                <Link className="nav-link" to={linkTo}>
                    <img alt="" className="img-icon" src={this.props.imgUrl}/>
                    <span className="menu-text">{this.props.name}</span>
                </Link>
            </li>
        );
    }
}

export default LisCategoryComponent;