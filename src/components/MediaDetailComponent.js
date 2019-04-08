import React from 'react';
import LikeDislikeComponent from './../components/LikeDislikeComponent';
import ShareComponent from './../components/ShareComponent';
import FavoriteComponent from './FavoriteComponent';
import ListCommentComponent from './ListCommentComponent';
import "./../../node_modules/video-react/dist/video-react.css";
import {checkAuth, getAuth, commentAction, getListComment} from './../actions/actions';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  PlayToggle,
  BigPlayButton,
  LoadingSpinner
} from 'video-react';
import {connect} from 'react-redux';
import * as type from './../constants/constants';
import ReportComponent from './ReportComponent';

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
                this.props.updateListCmt({type: type.GET_LIST_COMMENT_ACTION, data: this.props.listComment});
            }).catch(err => {
                console.log('err', err);
            });
            this.commentText.value = '';
        }
    }

    componentDidMount() {
        this.props.getListComment(this.props.mediaId, pageNum);
    }

    render() {
        var data = this.props;
        let {listComment} = this.props;
        return (
            <React.Fragment>
                <div className="card card-small card-post">
                    <Player ref="player"
                        fluid={false}
                        width="100%"
                        height={497}
                        playsInline
                        autoPlay
                        poster={data.image}>
                        <source src={data.url} />
                        <LoadingSpinner/>
                        <BigPlayButton position="center"/>
                        <ControlBar>
                            {/* <ReplayControl seconds={10} order={1.1} /> */}
                            {/* <ForwardControl seconds={10} order={1.2} /> */}
                            {/* <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.1]} order={7.1} /> */}
                            <VolumeMenuButton />
                            <PlayToggle />
                        </ControlBar>
                    </Player>
                </div>
                <p className=" r-media-title-large">
                    {data.title}
                </p>
                <p className="row-padding">
                    by {data.author !== undefined && data.author.name}
                </p>
                <div className="row row-padding row-padding-bottom">
                    <div className="col-lg-6">
                        views
                    </div>
                    <div className="col-lg-6 inline-flex">
                        <LikeDislikeComponent key={'like' + data.mediaId} mediaId={data.mediaId} userInteraction={data.userInteraction} interactions={data.interactions}/>
                        <ShareComponent key={'share' + data.mediaId}/>
                        <FavoriteComponent key={'favorite' + data.mediaId} mediaId={data.mediaId} userInteraction={data.userInteraction}/>
                        <ReportComponent key={'report' + data.mediaId} mediaId={data.mediaId}/>
                    </div>
                </div>
                <input ref={(input) => this.commentText = input} onKeyPress={this.doComment} type="text" className="form-control form-control-lg mb-3" placeholder="Write a comment"/>
                <p className="r-media-title-large">
                    {
                        listComment.data !== undefined && listComment.data.length
                    } COMMENTS
                </p>
                {
                    listComment.data !== undefined && listComment.data.map((elm, index) => {
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
                    })
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