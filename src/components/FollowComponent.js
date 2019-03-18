import React from 'react';
import star from './../images/favorite_home.png';

class FollowComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-right">
                <img className="r-detail-img-icon" src={star}/>
            </div>
        )
    }
}

export default FollowComponent;