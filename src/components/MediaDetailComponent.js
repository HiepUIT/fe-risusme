import React from 'react';
import LikeDislikeComponent from '../components/LikeDislikeComponent';
import ShareComponent from './../components/ShareComponent';
import FavoriteComponent from './FavoriteComponent';
import ListCommentComponent from './ListCommentComponent';
import {checkAuth, getAuth, commentAction, getListComment} from './../actions/actions';
import { DefaultPlayer as Video } from 'react-html5video';
import './../../node_modules/react-html5video/dist/styles.css';
import {connect} from 'react-redux';
import * as type from './../constants/constants';
import ReportComponent from './ReportComponent';
import InfiniteScroll from 'react-infinite-scroller';
import {css} from '@emotion/core';
import { ClipLoader } from 'react-spinners';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
let pageNum = 1;
class MediaDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        pageNum = 1;
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
          this.refs.player.load();
        }
    }

    doComment = (e) => {
        if(e.which === 13 && this.commentText.value !== '') {
            let isAuth = checkAuth();
            if(!isAuth)
                return;
            let interactions = {
                liked: false
            }
            let createdDate = (new Date()).toISOString();

            let cmtObj = {
                id: '',
                content: this.commentText.value,
                createdDate,
                author: getAuth(),
                interactions
            }

            this.props.commentAction(this.commentText.value, createdDate, '0', this.props.mediaId).then(res => {
                cmtObj.id = this.props.commentObj.comment.id;
                this.props.listComment.data.splice(0, 0, cmtObj);
                this.props.updateListCmt({type: type.GET_LIST_COMMENT_ACTION, data: {mediaId: this.props.mediaId, data: this.props.listComment}});
            }).catch(err => {
                console.log('err', err);
            });
            this.commentText.value = '';
        }
    }

    componentDidMount() {
        this.props.getListComment(this.props.mediaId, pageNum);
    }

    loadFunc = () => {
        console.log('loadfunc', pageNum);
        this.props.getListComment(this.props.mediaId, ++pageNum);
    }

    render() {
        var data = this.props;
        let {listComment} = this.props;
        let isLoadMore = false;
        if(listComment.data !== undefined && listComment.current_page < listComment.last_page)
            isLoadMore = true;
        return (
            <React.Fragment>
                <div className="card card-small card-post">
                    <Video autoPlay
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        poster={data.image}
                    >
                        <source src={data.url} />
                    </Video>
                </div>
                <p className=" r-media-title-large">
                    {data.title}
                </p>
                <div className="row row-padding row-padding-bottom">
                    <div className="col-lg-6">
                        <span>by {data.author !== undefined && data.author.name}</span>
                    </div>
                    <div className="col-lg-6 text-right">
                        <button type="button" className="mb-2 btn btn-sm btn-warning">Follow</button>
                    </div>
                </div>
                <div className="row row-padding row-padding-bottom">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                        <LikeDislikeComponent key={'dislike' + data.mediaId} mediaId={data.mediaId} userInteraction={data.userInteraction} interactions={data.interactions}/>
                    </div>
                    <div className="col-lg-2">
                        <ShareComponent key={'share' + data.mediaId}/>
                    </div>
                    <div className="col-lg-2">
                        <FavoriteComponent key={'favorite' + data.mediaId} mediaId={data.mediaId} userInteraction={data.userInteraction}/>
                    </div>
                    <div className="col-lg-2">
                        <ReportComponent key={'report' + data.mediaId} mediaId={data.mediaId}/>
                    </div>
                </div>
                <div class="row r-media-title-large border-top">&nbsp;</div>
                <input ref={(input) => this.commentText = input} onKeyPress={this.doComment} type="text" className="form-control form-control-lg mb-3" placeholder="Write a comment"/>
                <p className="r-media-title-large">
                    {
                        this.props.interactions.commented !== undefined && this.props.interactions.commented
                    } COMMENTS
                </p>
                {
                    listComment.data !== undefined && <InfiniteScroll
                        key={'cmt' + this.props.mediaId}
                        pageStart={1}
                        loadMore={this.loadFunc}
                        hasMore={isLoadMore}
                        loader={
                            <div key={listComment.data.length} className="row sweet-loading">
                                <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    size={30}
                                    color={'##5a6169'}
                                    loading={true}/>
                            </div> 
                        }
                    >
                        {listComment.data.map((elm, index) => {
                            return (
                                <ListCommentComponent 
                                    key={index}
                                    cmtId={elm.id}
                                    author={elm.author}
                                    createdDate={elm.createdDate}
                                    content={elm.content}
                                    interactions={elm.interactions}
                                    userInteraction={elm.userInteraction}/>
                            )
                        })}
                    </InfiniteScroll>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        commentObj: state.commentReducer,
        listComment: state.listCommentReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListComment: (mediaId, page) => {
            dispatch(getListComment(mediaId, page));
        },
        commentAction: async (content, idCode, id, mediaId) => {
            await dispatch(commentAction(content, idCode, id, mediaId));
        },
        updateListCmt: action => dispatch(action)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (MediaDetailComponent);