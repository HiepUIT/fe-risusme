import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteComponent from './FavoriteComponent';
import LikeDislikeComponent from './LikeDislikeComponent';
import CommmentComponent from './CommentComponent';

class CategoryDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayPreview: false,
        }
    }
    playPreview = () => {
        this.setState({isPlayPreview: true});
        this.refs.video.play();
        // setTimeout(() => {
        //     this.refs.video.pause();
        //     this.refs.video.currentTime = 0;
        //     if(this.state.isPlayPreview)
        //         this.playPreview();
        // }, 3000);
    }

    resetPreview = () => {
        this.refs.video.pause();
        this.refs.video.currentTime = 0;
        this.setState({isPlayPreview: false});
    }

    render() {
        let path = '/media/' + this.props.categoryId + '/' + this.props.id;
        // let backgroundUrl = 'url(' + this.props.image + ')'
        return (
            <div className="padding-5 col-lg-2 col-md-6 col-sm-6 mb-4">
                <Link className="cursor" to={path}>
                    <div className="stats-small--1 card-no-border-r pos-relative">
                        <video className="r-img-fill-100 m-auto" style={{width: '100%', height: '117px', objectFit: 'cover'}} ref="video" playsInline
                            poster={this.props.image} muted key={this.props.id} onMouseOver={this.playPreview} onMouseOut={this.resetPreview}>
                            {/* <source src={this.props.url}></source> */}
                        </video>
                        <div className="r-text-duration"><span>{this.props.duration}</span></div>
                    </div>
                    <span className="r-media-title">{this.props.title}</span>
                </Link>
                
                
                <div className="row margin-top-bot-2">
                    <div className="col-lg-6">
                    {this.props.author.name}
                    </div>
                    <div className="col-lg-6 text-right">
                        <FavoriteComponent key={'favorite' + this.props.id} mediaId={this.props.id} userInteraction={this.props.userInteraction}/>
                    </div>
                </div>
                <div className="row margin-top-bot-2">
                    <div className="col-lg-4">
                        <CommmentComponent key={'comment' + this.props.id} id={this.props.id} commented={this.props.interactions.commented}/>
                    </div>
                    <div className="col-lg-8">
                        <LikeDislikeComponent key={'like' + this.props.id} mediaId={this.props.id} interactions={this.props.interactions} userInteraction={this.props.userInteraction}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryDetailComponent;