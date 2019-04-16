import React from 'react';
import {connect} from 'react-redux';
import {getMedialDetail, resetMediaDetail} from './../actions/actions';
import MediaDetailComponent from './../components/MediaDetailComponent';
import ListRelativeMediaContainer from './ListRelativeMediaContainer';
import MediaContentLoaderComponent from './../components/MediaContentLoaderComponent';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from './../images/slider/001.jpg';
import slider2 from './../images/slider/002.jpg';
import slider3 from './../images/slider/003.jpg';

class MediaDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            direction: null
        }
    }
    componentDidMount() {
        this.props.resetMediaDetail();
        window.scrollTo(0, 0);
        let id = this.props.match.params.id;
        this.props.getMedialDetail(id);
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
        var {mediaDetail} = this.props;
        const { index, direction } = this.state;
        if(mediaDetail.userInteraction === undefined)
            return <MediaContentLoaderComponent banner={this.loadBanner(index, direction)}/>
        return (
            <div className="row row-margin">
                <div className="padding-5 col-lg-9 col-sm-12">
                    {mediaDetail.userInteraction !== undefined && <MediaDetailComponent
                        key={mediaDetail.id}
                        mediaId={mediaDetail.id}
                        image={mediaDetail.image}
                        title={mediaDetail.title}
                        url={mediaDetail.url}
                        interactions={mediaDetail.interactions}
                        userInteraction={mediaDetail.userInteraction}
                        comments={mediaDetail.comments}
                        author={mediaDetail.author}
                    />}
                </div>
                <div className="padding-5 col-lg-3 col-sm-12">
                    <ListRelativeMediaContainer banner={this.loadBanner(index, direction)} mediaId={this.props.match.params.id} categoryId={this.props.match.params.categoryId}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mediaDetail: state.mediaDetailReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        getMedialDetail: (id) => {
            dispatch(getMedialDetail(id));
        },
        resetMediaDetail: async () => {
            await dispatch(resetMediaDetail());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp) (MediaDetailContainer);

