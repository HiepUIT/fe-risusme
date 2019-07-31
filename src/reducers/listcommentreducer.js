import * as type from './../constants/constants';

var listCommentState = {};

var myReducer = (state = listCommentState, action) => {
    switch(action.type) {
        case type.GET_LIST_COMMENT_ACTION: {
            var arr = [];
            if(state.mediaId !== undefined && state.mediaId === action.data.mediaId) {
                arr = state.data;
            }
            action.data.data.data.map(elm => arr.push(elm));
            return Object.assign({}, state, {mediaId: action.data.mediaId, data: arr, current_page: action.data.data.current_page, last_page: action.data.data.last_page});
        }
        default: {
            return state;
        }
    }
}

export default myReducer;