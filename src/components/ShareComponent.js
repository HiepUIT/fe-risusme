import React from 'react';
import share from './../images/share.png';

class ShareComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-right">
                <img className="r-detail-img-icon" src={share}/>
            </div>
        )
    }
}

export default ShareComponent;