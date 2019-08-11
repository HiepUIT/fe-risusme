import React from 'react';
import cmt from './../images/cmt.png';
import {connect} from 'react-redux';
import {getListComment, resetListComment, checkAuth, getAuth, commentAction} from './../actions/actions';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import * as type from './../constants/constants';

let pageNum = 1;
class CommmentComponent extends React.Component {
    constructor(props) {
        super(props);
        pageNum = 1;
        this.state = {
            commented: this.props.commented
        }
    }
    showDetail = (e) => {
        this.props.resetListComment().then(() => {
            this.props.getListComment(this.props.id, pageNum);
        });
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
            this.props.commentAction(this.commentText.value, createdDate, '0', this.props.id).then(res => {
                cmtObj.id = this.props.commentObj.comment.id;
                this.props.listComment.data.splice(0, 0, cmtObj);
                this.setState({
                    commented: this.props.listComment.data.length
                });
                this.props.updateListCmt({type: type.GET_LIST_COMMENT_ACTION, data: {mediaId: this.props.id, data: this.props.listComment}});
            }).catch(err => {
                console.log('err', err);
            });
            this.commentText.value = '';
        }
    }

    render() {
        let {listComment} = this.props;
        return (
            <div className="r-v1-content-box">
                <OverlayTrigger trigger="click" rootClose onClick={this.showDetail} placement="right" overlay={
                    <Popover id="popover-cmt">
                        <Popover.Content>
                            {
                                listComment.data !== undefined && listComment.data.map((elm) => {
                                    return (
                                        <div key={elm.id} className="r-comment">
                                            <div className="card-post__author d-flex r-cmt-author-padding">
                                                <img alt="" src={elm.author.avatar} className="card-post__author-avatar card-post__author-avatar--small"/>
                                                <div className="d-flex flex-column justify-content-center ml-3">
                                                    <span className="r-author-name card-post__author-name">{elm.author.name}</span>
                                                    <span className="text-muted">{elm.createdDate}</span>
                                                </div>
                                            </div>
                                            <p className="r-cmt-content">{elm.content}</p>
                                        </div>
                                    )
                                })
                            }
                            <input ref={(input) => this.commentText = input} onKeyPress={this.doComment} type="text" className="form-control form-control-lg mb-3" placeholder="Write a comment"/>
                        </Popover.Content>
                    </Popover>
                }>
                    <img alt="" onClick={this.showDetail} className="r-detail-img-icon" src={cmt}/>
                </OverlayTrigger>
                <span className="r-v1-text-detail">{this.state.commented !== undefined && this.state.commented}</span>
            </div>
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
            dispatch(getListComment(mediaId, page))
        },
        resetListComment: async () => {
            await dispatch(resetListComment());
        },
        commentAction: async (content, idCode, id, mediaId) => {
            await dispatch(commentAction(content, idCode, id, mediaId));
        },
        updateListCmt: action => dispatch(action)
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CommmentComponent);