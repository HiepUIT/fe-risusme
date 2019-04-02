import * as type from './../constants/constants';

var listCommentState = {};

var myReducer = (state = listCommentState, action) => {
    switch(action.type) {
        case type.GET_LIST_COMMENT_ACTION: {
            state = action.data;
            return Object.assign({}, state, action.data);
        }
        default: {
            return state;
        }
    }
}

export default myReducer;