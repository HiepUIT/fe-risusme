import React from 'react';
import like from './../images/like.png';
import dislike from './../images/dislike.png';

class LikeDislikeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        var data = this.props;
        return (
            <div className="text-right">
                <img className="r-detail-img-icon" src={like}/>
                <span className="r-detail-padding-10">{typeof(data.interactions) != 'undefined' && data.interactions.liked}</span>
                <img className="r-detail-img-icon" src={dislike}/> 
                <span className="r-detail-padding-10">{typeof(data.interactions) != 'undefined' && data.interactions.disliked}</span>
            </div>
        );
    }
}

export default LikeDislikeComponent;