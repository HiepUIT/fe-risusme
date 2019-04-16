import React from 'react';
import {connect} from 'react-redux';
import {getCategoryDetail, resetCategoryDetail} from '../actions/actions';
import CategoryDetailComponent from '../components/CategoryDetailComponent';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import {css} from '@emotion/core';
import CategoryDetailContentLoaderComponent from './../components/CategoryDetailContentLoaderComponent';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from './../images/slider/001.jpg';
import slider2 from './../images/slider/002.jpg';
import slider3 from './../images/slider/003.jpg';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
let pageNum = 1;
class CategoryDetailContainer extends React.Component {
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
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, 1);
    }

    componentDidUpdate(preProps) {
        if(preProps.match.params.id === this.props.match.params.id)
            return;
        this.props.resetCategoryDetail();
        window.scrollTo(0, 0);
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, 1);
    }

    loadFunc = () => {
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, ++pageNum);
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

    render () {
        let {data, isLoadMore} = this.props.categoryDetails;
        const { index, direction } = this.state;
        if(data === undefined || data.length == 0) {
            return <CategoryDetailContentLoaderComponent banner={this.loadBanner(index, direction)}/>
        }
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="row mb-4 banner-slider-ads">
                    {this.loadBanner(index, direction)}
                </div>
                {data.length > 0 && <InfiniteScroll
                    key={this.props.match.params.id}
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
                                return <CategoryDetailComponent
                                        key={index}
                                        categoryId={this.props.categoryDetails.typeCategory}
                                        id={elm.id}
                                        image={elm.image}
                                        url={elm.url}
                                        title={elm.title}
                                        author={elm.author}
                                        interactions={elm.interactions}
                                        userInteraction={elm.userInteraction}
                                        duration={elm.duration}
                                    />
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
        getCategoryDetail: (categoryId, page) => {
            dispatch(getCategoryDetail(categoryId, page));
        },
        resetCategoryDetail: async () => {
            await dispatch(resetCategoryDetail());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailContainer);