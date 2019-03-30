import * as type from './../constants/constants';

var commentObjState = {
    idCode: '',
    comment: {}
}

var myReducer = (state = commentObjState, action) => {
    switch (action.type) {
        case type.COMMENT_ACTION: {
            return Object.assign({}, state, {idCode: action.data.idCode, comment: action.data.comment});
        }
        default: {
            return state;
        }
    }
}

export default myReducer;