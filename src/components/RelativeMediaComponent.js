import React from 'react';
import {withRouter} from 'react-router-dom';

class RelativeMediaComponent extends React.Component {
    render() {
        let path = '/media/' + this.props.categoryId + '/' + this.props.id;
        return(
            <div className="d-flex flex-row m-auto">
                <a className="cursor stats-small--1 r-relative-media-box" href={path}>
                    <div className="stats-small__data text-center pos-relative">
                        <img alt="" className="r-height-200 r-img-fill-100 m-auto" src={this.props.image}/>
                        <div className="r-text-duration" style={{fontSize: "10px"}}>
                            <span>{this.props.duration}</span>
                        </div>
                    </div>
                </a>
                <div className="r-padding-left-right col-lg-6">
                    <span className="r-media-title">{this.props.title}</span>
                    <p>{this.props.author.name}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(RelativeMediaComponent);