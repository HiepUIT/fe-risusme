import * as type from './../constants/constants';

var listCommentState = {};

var myReducer = (state = listCommentState, action) => {
    switch(action.type) {
        case type.GET_LIST_COMMENT_ACTION: {
            // var arr = [];
            // if(state.mediaId !== undefined && state.mediaId === action.data.mediaId) {
            //     arr = state.data;
            // }
            // console.log('state', state);
            // console.log('action', action);
            // action.data.data.data.map(elm => {
            //     arr.map(elm2 => {
            //         if(elm.id != elm2.id) {
            //             console.log('id', elm.id);
            //             arr.push(elm);
            //         }
            //     });
            // });
            return Object.assign({}, state, {mediaId: action.data.mediaId, data: action.data.data.data, current_page: action.data.data.current_page, last_page: action.data.data.last_page});
        }
        case type.RESET_LIST_COMMENT_ACTION: {
            return Object.assign({}, state, {mediaId: '', data: action.data, current_page: 0, last_page: 0});
        }
        default: {
            return state;
        }
    }
}

export default myReducer;