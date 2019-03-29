import React from 'react';
import {Link} from 'react-router-dom';

class RelativeMediaComponent extends React.Component {
    render() {
        let path = '/media/' + this.props.categoryId + '/' + this.props.id;
        return(
            <div className="stats-small stats-small--1 card-no-border-r">
                <div className="d-flex flex-row m-auto">
                <Link className="cursor r-max-width-50 r-relative-media-box" to={path}>
                    <div className="stats-small__data text-center">
                        <img alt="" className="r-height-200 r-img-fill-100 m-auto" src={this.props.image}/>
                        <div><span className="r-text-duration">{this.props.duration}</span></div>
                    </div>
                </Link>
                    <div className="r-padding-left-right col-lg-6">
                        <span className="r-media-title">{this.props.title}</span>
                        <p>{this.props.author.name}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default RelativeMediaComponent;