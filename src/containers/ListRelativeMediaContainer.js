import React from 'react';
import {connect} from 'react-redux';
import {getListRelativeMedia} from './../actions/actions';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import RelativeMediaComponent from './../components/RelativeMediaComponent';
import {css} from '@emotion/core';
import * as constants from './../constants/constants';
import * as config from './../configs/configs';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

let pageNum = 1;
class ListRelativeMediaContainer extends React.Component {
    constructor(props) {
        super(props);
        pageNum = 1;
    }

    componentDidMount() {
        let categoryId = this.props.categoryId;
        let type = this.props.categoryId;
        if(categoryId === constants.GET_RELATIVE_MEDIA_HOT)
            categoryId = config.CATEGORYID_HOT;
        else if(categoryId === constants.GET_RELATIVE_MEDIA_NEW)
            categoryId = config.CATEGORYID_NEW;
        else if(categoryId === constants.GET_RELATIVE_MEDIA_FAVORITED)
            categoryId = config.CATEGORYID_FAVORITED;
        else
            type = constants.GET_RELATIVE_MEDIA;

        this.props.getListRelativeMedia(type, categoryId, 1, this.props.mediaId);
    }

    loadFunc = () => {
        let categoryId = this.props.categoryId;
        let type = this.props.categoryId;
        if(categoryId === constants.GET_RELATIVE_MEDIA_HOT)
            categoryId = config.CATEGORYID_HOT;
        else if(categoryId === constants.GET_RELATIVE_MEDIA_NEW)
            categoryId = config.CATEGORYID_NEW;
        else if(categoryId === constants.GET_RELATIVE_MEDIA_FAVORITED)
            categoryId = config.CATEGORYID_FAVORITED;
        else
            type = constants.GET_RELATIVE_MEDIA;
        this.props.getListRelativeMedia(type, categoryId, ++pageNum, this.props.mediaId);
    }

    render() {
        let {data, isLoadMore} = this.props.listRelativeMedia;
        console.log('isLoadMore', isLoadMore);
        return (
            <React.Fragment>
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
                        <div className="stats-small stats-small--1 card-no-border-r">
                            <div className="card-body p-0 d-flex">
                                <div className="d-flex flex-column m-auto">
                                    <div className="stats-small__data text-center" >
                                        Ads
                                    </div>
                                </div>
                                <canvas height="120" className="blog-overview-stats-small-1"></canvas>
                            </div>
                        </div>
                    {
                        data.map((elm, index) => {
                            return (
                                    <RelativeMediaComponent
                                        key={index}
                                        categoryId={this.props.categoryId}
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
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        listRelativeMedia: state.listRelativeMediaReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListRelativeMedia: (type, categoryId, page, mediaId) => {
            dispatch(getListRelativeMedia(type, categoryId, page, mediaId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListRelativeMediaContainer);