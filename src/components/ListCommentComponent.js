import React from 'react';
import iconLikeImg from './../images/like.png';
import iconLikePressImg from './../images/like_press.png';

class ListCommentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    likeCommentAction = () => {

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
                    <img alt="" className="r-like-cmt-icon" onClick={this.likeCommentAction} src={iconLikeImg}/> <span className="r-like-cmt-detail-padding-2">{this.props.interactions.liked}</span>
                </div>
            </div>
        );
    }
}

export default ListCommentComponent;