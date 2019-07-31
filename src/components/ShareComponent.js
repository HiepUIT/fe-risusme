import React from 'react';
import share from './../images/share.png';

class ShareComponent extends React.Component {

    render() {
        return (
            <div className="text-right">
                <img alt="" className="r-detail-img-icon" src={share}/>
            </div>
        )
    }
}

export default ShareComponent;