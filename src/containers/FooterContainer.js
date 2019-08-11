import React from 'react';
import fb from './../images/fb.png';
import tw from './../images/tw.png';

class FooterContainer extends React.Component {
    constructor(props) {
        super();
        this.state = {
            classN: 'footer',
            currentPos: 100
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let {currentPos} = this.state;
        let classN = 'footer';
        if(currentPos < window.pageYOffset) { //down
            classN = 'footer footer__down';
        }
        this.setState({
            classN,
            currentPos: window.pageYOffset
        });
    }

    render() {
        return (
            <div className={this.state.classN}>
                <ul className="footer-nav">
                    <li className="footer-nav-item">© 2019 Risusme</li>
                    <li className="footer-nav-item">
                        <a href="http://home.risusme.com" target="_blank">About</a>
                    </li>
                    <li className="footer-nav-item">Privacy</li>
                    <li className="footer-nav-item">
                        <a href="https://www.facebook.com/risusme/" target="_bank" rel="noopener noreferrer" style={{color: '#bbb'}}><img alt="" style={{backgroundColor: '#bbb', borderRadius: '50%', width: '40%'}} src={fb}/></a>
                    </li>
                    <li className="footer-nav-item" style={{marginLeft: '-24px'}}>
                        <a href="https://twitter.com/risusm" target="_blank" rel="noopener noreferrer" style={{color: '#bbb'}}><img alt="" style={{backgroundColor: '#bbb', borderRadius: '50%', width: '40%'}} src={tw}/></a>
                    </li>
                </ul>
                <div className="footer-box">
                    <a href="https://play.google.com/store/apps/details?id=com.gofutech.risusme" target="_bank" style={{color: '#fff'}}>Get the App</a>
                </div>
            </div>
        );
    }
}

export default FooterContainer;