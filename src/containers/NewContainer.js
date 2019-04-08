import React from 'react';
import {connect} from 'react-redux';
import CategoryDetailComponent from './../components/CategoryDetailComponent';
import * as config from './../configs/configs';
import * as constants from './../constants/constants';
import {getCategoryDetailNew, resetCategoryDetail} from './../actions/actions';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import {css} from '@emotion/core';

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
    }

    componentDidMount() {
        this.props.resetCategoryDetail();
        window.scrollTo(0, 0);
        this.props.getCategoryDetailNew(config.CATEGORYID_NEW, 1);
    }

    loadFunc = (page) => {
        this.props.getCategoryDetailNew(config.CATEGORYID_NEW, ++pageNum);
    }

    render() {
        let data = this.props.categoryDetails.data;
        let isLoadMore = this.props.categoryDetails.isLoadMore;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    New container
                </div>
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