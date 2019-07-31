import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from './../images/slider/001.jpg';
import slider2 from './../images/slider/002.jpg';
import slider3 from './../images/slider/003.jpg';
import axios from 'axios';
import {getToken} from './../actions/actions';
import * as config from './../configs/configs';

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: null,
            data: {}
        }
    }

    handleSelect = (selectedIndex, e) => {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    loadBanner = (index, direction) => {
        return (
            <Carousel
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
            >
                <Carousel.Item>
                    <img
                        className="h-slider w-100"
                        src={slider1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="h-slider w-100"
                        src={slider2}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="h-slider w-100"
                        src={slider3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }

    componentDidMount() {
        let token = getToken();
        let now = new Date();
        let url = config.API_HOME_PAGE.replace('{VIEWDATE}', now.toISOString()).replace('{PAGE}', 1);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    initData = () => {
        return (
            <div className="padding-5 col-lg-2 col-md-6 col-sm-6 mb-4">
                <a className="cursor" href="#">
                    <div className="stats-small stats-small--1 card-no-border-r pos-relative">
                        <video className="r-img-fill-100 m-auto" style={{width: '100%', height: '150px', objectFit: 'cover'}} ref="video" playsInline
                            poster="https://i.ytimg.com/vi/ZAQenejVI2g/hqdefault.jpg">
                            {/* <source src={this.props.url}></source> */}
                        </video>
                        <div className="r-text-duration"><span>2:10</span></div>
                    </div>
                </a>
                <span className="r-media-title">title</span>
            </div>
        );
    }

    render() {
        const { index, direction } = this.state;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="row mb-4 banner-slider-ads">
                    {this.loadBanner(index, direction)}
                </div>
                <div className="row">
                    <div className="home-img-container">
                        <img src="https://i.imgur.com/r7eRrYz.jpg" className="home-auth-img"/>
                        <span className="home-auth-name">Auth name</span>
                    </div>
                        {this.initData()}
                </div>
            </div>
        );
    }
}

export default HomeContainer;