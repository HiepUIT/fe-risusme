import React from 'react';
import {connect} from 'react-redux';
import {getCategoryDetail} from '../actions/actions';
import CategoryDetailComponent from '../components/CategoryDetailComponent';
import InfiniteScroll from 'react-infinite-scroller';
import { ClipLoader } from 'react-spinners';
import {css} from '@emotion/core';

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
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, 1);
    }

    componentDidUpdate(preProps) {
        if(preProps.match.params.id === this.props.match.params.id)
            return;
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, 1);
    }

    loadFunc = () => {
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, ++pageNum);
    }

    render () {
        let {data, isLoadMore} = this.props.categoryDetails;
        console.log('isLoadMore', isLoadMore);
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    Animal container
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
                            return (
                                    <CategoryDetailComponent
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
        getCategoryDetail: (categoryId, page) => {
            dispatch(getCategoryDetail(categoryId, page));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailContainer);