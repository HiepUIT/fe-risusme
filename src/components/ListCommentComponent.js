import React from 'react';
import iconLikeImg from './../images/like.png';
import iconLikePressImg from './../images/like_press.png';
import {likeCommentAction, checkAuth} from './../actions/actions';

class ListCommentComponent extends React.Component {
    constructor(props) {
        super(props);
        let isLike = false;
        if(this.props.userInteraction !== undefined)
            isLike = this.props.userInteraction.isLiked;
        let icon = iconLikeImg;
        if(isLike)
            icon = iconLikePressImg;

        this.state = {
            isLike,
            icon,
            nLiked: this.props.interactions.liked
        }
    }

    likeCommentAction = () => {
        let isAuth = checkAuth();
        if(!isAuth)
            return;
        let isLike = this.state.isLike;
        let icon = this.state.icon;
        let nLiked = this.state.nLiked;
        if(!isLike) {
            isLike = true;
            icon = iconLikePressImg;
            ++nLiked;
        } else {
            isLike = false;
            icon = iconLikeImg;
            --nLiked;
        }

        this.setState({
            isLike, icon, nLiked
        });
        likeCommentAction(this.props.cmtId);
    }

    render() {
        return (
            <div className="r-comment">
                <div className="card-post__author d-flex r-cmt-author-padding">
                    <img alt="" src={this.props.author.avatar} className="card-post__author-avatar card-post__author-avatar--small"/>
                    <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="r-author-name card-post__author-name">{this.props.author.name}</span>
                        <span className="text-muted">{this.props.createdDate}</span>
                    </div>
                </div>
                <p className="r-cmt-content">{this.props.content}</p>
                <div className="r-cmt-content">
                    <img alt="" className="r-like-cmt-icon" onClick={this.likeCommentAction} src={this.state.icon}/> <span className="r-like-cmt-detail-padding-2">{this.state.nLiked}</span>
                </div>
            </div>
        );
    }
}

export default ListCommentComponent;