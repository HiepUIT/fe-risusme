import * as type from './../constants/constants';

var mediaDetailState = {};

var myReducer = (state = mediaDetailState, action) => {
    switch(action.type) {
        case type.GET_MEDIA_DETAIL: {
            state = action.data;
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;