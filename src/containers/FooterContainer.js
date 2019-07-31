import React from 'react';

class FooterContainer extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="footer">
                <ul className="footer-nav">
                    <li className="footer-nav-item">About</li>
                </ul>
            </div>
        );
    }
}

export default FooterContainer;