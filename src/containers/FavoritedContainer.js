import React from 'react';
import {connect} from 'react-redux';
import {getCategoryDetailFavorited, resetCategoryDetail, checkAuth} from './../actions/actions';
import CategoryDetailComponent from './../components/CategoryDetailComponent';
import * as config from './../configs/configs';
import * as constants from './../constants/constants';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import {css} from '@emotion/core';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from './../images/slider/001.jpg';
import slider2 from './../images/slider/002.jpg';
import slider3 from './../images/slider/003.jpg';
import PopupNotificationLogin from './../components/PopupNotificationLogin';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

let pageNum = 1;
class FavoritedContainer extends React.Component {
    constructor(props) {
        super(props);
        let isAuth = checkAuth();
        pageNum = 1;
        this.state = {
            isAuth,
            showModal: false,
            index: 0,
            direction: null
        }
    }

    componentDidMount() {
        if(!this.state.isAuth) {
            this.setState({showModal: true});
            return;
        }
        this.props.resetCategoryDetail();
        window.scrollTo(0, 0);
        this.props.getCategoryDetailFavorited(config.CATEGORYID_FAVORITED, 1);
    }

    loadFunc = () => {
        this.props.getCategoryDetailFavorited(config.CATEGORYID_FAVORITED, ++pageNum);
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

    render() {
        let data = this.props.categoryDetails.data;
        let isLoadMore = this.props.categoryDetails.isLoadMore;
        const { index, direction } = this.state;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="row banner-slider-ads">
                    {this.loadBanner(index, direction)}
                </div>
                {data.length > 0 && <InfiniteScroll
                    pageStart={1}
                    loadMore={this.loadFunc}
                    hasMore={isLoadMore}
                    loader={
                        <div key={data.length} className="row sweet-loading">
                            <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={30}
                                color={'##5a6169'}
                                loading={true}/>
                        </div> 
                    }>
                    <div className="row">
                    {
                        data.map((elm, index) => {
                            return (
                                    <CategoryDetailComponent
                                        categoryId={constants.GET_RELATIVE_MEDIA_FAVORITED}
                                        key={index + data.length}
                                        id={elm.id}
                                        image={elm.image}
                                        url={elm.url}
                                        title={elm.title}
                                        author={elm.author}
                                        interactions={elm.interactions}
                                        userInteraction={elm.userInteraction}
                                        duration={elm.duration}
                                    />
                            );
                        })
                    } 
                    </div>
                </InfiniteScroll>
                }
                <PopupNotificationLogin showModal={this.state.showModal}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoryDetails: state.categoryDetailReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryDetailFavorited: (category, page) => {
            dispatch(getCategoryDetailFavorited(category, page));
        },
        resetCategoryDetail: async () => {
            await dispatch(resetCategoryDetail());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritedContainer);