import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteComponent from './FavoriteComponent';
import LikeDislikeComponent from './LikeDislikeComponent';
import CommmentComponent from './CommentComponent';
import video from 'video.js'

class CategoryDetailComponent extends React.Component {
    playPreview = () => {
        this.refs.video.play();
    }

    resetPreview = () => {
        this.refs.video.pause();
    }

    render() {
        let path = '/media/' + this.props.categoryId + '/' + this.props.id;
        return (
            <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <Link className="cursor" to={path}>
                    <div className="stats-small stats-small--1 card-no-border-r">
                        <div className="card-body p-0 d-flex">
                            <div className="d-flex flex-column m-auto">
                                <div className="stats-small__data text-center">
                                    {/* <img alt="" className="r-img-fill-100 m-auto" src={this.props.image}/> */}
                                    <video className="r-img-fill-100 m-auto" ref="video" playsInline
                                        poster={this.props.image} muted key={this.props.id} onMouseOver={this.playPreview} onMouseOut={this.resetPreview}>
                                        <source src={this.props.url}></source>
                                    </video>
                                    <div><span className="r-text-duration">{this.props.duration}</span></div>
                                </div>
                            </div>
                            <canvas height="120" className="blog-overview-stats-small-1"></canvas>
                        </div>
                    </div>
                </Link>
                <span className="r-media-title">{this.props.title}</span>
                
                <div className="row margin-top-bot-2">
                    <div className="col-lg-6">
                    {this.props.author.name}
                    </div>
                    <div className="col-lg-6 text-right">
                        <FavoriteComponent key={'favorite' + this.props.id} mediaId={this.props.id} userInteraction={this.props.userInteraction}/>
                    </div>
                </div>
                <div className="row margin-top-bot-2">
                    <div className="col-lg-6">
                        <CommmentComponent key={'comment' + this.props.id} id={this.props.id} commented={this.props.interactions.commented}/>
                    </div>
                    <div className="col-lg-6 text-right">
                        <LikeDislikeComponent key={'like' + this.props.id} mediaId={this.props.id} interactions={this.props.interactions} userInteraction={this.props.userInteraction}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryDetailComponent;