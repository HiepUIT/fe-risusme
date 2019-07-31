import React from 'react';
import {connect} from 'react-redux';
import CategoryDetailComponent from './../components/CategoryDetailComponent';
import * as config from './../configs/configs';
import * as constants from './../constants/constants';
import {getCategoryDetailNew, resetCategoryDetail} from './../actions/actions';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import {css} from '@emotion/core';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from './../images/slider/001.jpg';
import slider2 from './../images/slider/002.jpg';
import slider3 from './../images/slider/003.jpg';
import CategoryDetailContentLoaderComponent from './../components/CategoryDetailContentLoaderComponent';
import CustomNavLink from './../components/CustomNavLink';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

let pageNum = 1;
class NewContainer extends React.Component {
    constructor(props) {
        super(props);
        pageNum = 1;
        this.state = {
            index: 0,
            direction: null
        }
    }

    componentDidMount() {
        this.props.resetCategoryDetail();
        window.scrollTo(0, 0);
        let id = config.CATEGORYID_NEW;
        if(this.props.match.params.id !== undefined)
            id = this.props.match.params.id;
        this.props.getCategoryDetailNew(id, 1);
    }

    loadFunc = () => {
        let id = config.CATEGORYID_NEW;
        if(this.props.match.params.id !== undefined)
            id = this.props.match.params.id;
        this.props.getCategoryDetailNew(id, ++pageNum);
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
        if(data === undefined || data.length === 0) {
            return <CategoryDetailContentLoaderComponent banner={this.loadBanner(index, direction)}/>
        }

        return (
            <div className="main-content-container container-fluid px-4">
                <div className="row banner-slider-ads">
                    {this.loadBanner(index, direction)}
                </div>
                {
                    this.props.match.params.id !== '0' &&
                        <div className="row">
                            <ul className="nav nav-tabs nav-justified nav-menu">
                                <li className="nav-item">
                                    <CustomNavLink label="Hot" to={'/hot/' + this.props.match.params.id} classNe="nav-link nav-menu-text" activeOnlyWhenExact={false} icon=""/>
                                </li>
                                <li className="nav-item">
                                    <CustomNavLink label="New" to={'/new/' + this.props.match.params.id} classNe="nav-link nav-menu-text" activeOnlyWhenExact={false} icon=""/>
                                </li>
                                <li className="nav-item">
                                    <CustomNavLink label="Follow" to="/c" classNe="nav-link nav-menu-text" activeOnlyWhenExact={false} icon=""/>
                                </li>
                            </ul>
                        </div>
                }
                {data.length > 0 && <InfiniteScroll
                    key={data.length}
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
                                        categoryId={constants.GET_RELATIVE_MEDIA_NEW}
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
        getCategoryDetailNew: (category, page) => {
            dispatch(getCategoryDetailNew(category, page));
        },
        resetCategoryDetail: async () => {
            await dispatch(resetCategoryDetail());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewContainer);