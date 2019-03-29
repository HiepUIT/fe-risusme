import React from 'react';
import iconLikeImg from './../images/like.png';
import iconLikePressImg from './../images/like_press.png';
import iconDislikeImg from './../images/dislike.png';
import iconDislikePressImg from './../images/dislike_press.png';
import {likeAction, dislikeAction, checkAuth} from './../actions/actions';

class LikeDislikeComponent extends React.Component {
    constructor(props) {
        super(props);
        let isAuth = checkAuth();
        let {userInteraction} = this.props;
        let iconLike = iconLikeImg;
        let iconDislike = iconDislikeImg;
        if(userInteraction.isLiked)
            iconLike = iconLikePressImg;
        if(userInteraction.isDisliked)
            iconDislike = iconDislikePressImg;
        this.state = {
            isAuth: isAuth,
            like: {
                icon: iconLike,
                isLike: userInteraction.isLiked,
                likeInteraction: this.props.interactions.liked
            },
            dislike: {
                icon: iconDislike,
                isDislike: userInteraction.isDisliked,
                dislikeInteraction: this.props.interactions.disliked
            }
        }
    }

    likeAction = () => {
        if(!this.state.isAuth)
            return;
        let likeInteraction = this.state.like.likeInteraction;
        let dislikeInteraction = this.state.dislike.dislikeInteraction;
        if(this.state.dislike.isDislike) {
            dislikeInteraction--;
            this.setState({dislike: {
                icon: iconDislikeImg,
                isDislike: false,
                dislikeInteraction: dislikeInteraction
            }});
        }
        if(this.state.like.isLike) {
            likeInteraction--;
            this.setState({like: {
                icon: iconLikeImg,
                isLike: false,
                likeInteraction: likeInteraction
            }});
        } else {
            likeInteraction++;
            this.setState({like: {
                icon: iconLikePressImg,
                isLike: true,
                likeInteraction: likeInteraction
            }});
        }
        likeAction(this.props.mediaId);
    }

    dislikeAction = () => {
        if(!this.state.isAuth)
            return;
        let likeInteraction = this.state.like.likeInteraction;
        let dislikeInteraction = this.state.dislike.dislikeInteraction;
        if(this.state.like.isLike) {
            likeInteraction--;
            this.setState({like: {
                icon: iconLikeImg,
                isLike: false,
                likeInteraction: likeInteraction
            }});
        }
        if(this.state.dislike.isDislike) {
            dislikeInteraction--;
            this.setState({dislike: {
                icon: iconDislikeImg,
                isDislike: false,
                dislikeInteraction: dislikeInteraction
            }})
        } else {
        dislikeInteraction++;
            this.setState({dislike: {
                icon: iconDislikePressImg,
                isDislike: true,
                dislikeInteraction: dislikeInteraction
            }});
        }
        dislikeAction(this.props.mediaId);
    }


    render() {
        var data = this.props;
        return (
            <div className="text-right">
                <img alt="" className="r-detail-img-icon" onClick={this.likeAction} src={this.state.like.icon}/>
                <span className="r-detail-padding-10">{data.interactions != undefined && this.state.like.likeInteraction}</span>
                <img alt="" className="r-detail-img-icon" onClick={this.dislikeAction} src={this.state.dislike.icon}/> 
                <span className="r-detail-padding-10-r0">{data.interactions != undefined && this.state.dislike.dislikeInteraction}</span>
            </div>
        );
    }
}

export default LikeDislikeComponent;