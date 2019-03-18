import * as type from './../constants/constants';

var categoryDetailState = [];

var myReducer = (state = categoryDetailState, action) => {
    switch(action.type) {
        case type.GET_CATEGORY_DETAIL: {
            state = action.data;
            return state;
        }
        case type.GET_CATEGORY_DETAIL_FAVORITED: {
            state = action.data;
            return state;
        }
        case type.GET_CATEGORY_DETAIL_FOLLOWED: {
            state = action.data;
            return state;
        }
        case type.GET_CATEGORY_DETAIL_HOT: {
            state = action.data;
            return state;
        }
        case type.GET_CATEGORY_DETAIL_NEW: {
            state = action.data;
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;