import * as type from './../constants/constants';

var listRelativeMediaState = {
    isLoadMore: true,
    data: [],
    mediaId: ''
}

var myReducer = (state = listRelativeMediaState, action) => {
    var arr = [];
    if(state.mediaId === action.mediaId)
        arr = state.data;
    switch(action.type) {
        case type.GET_RELATIVE_MEDIA_HOT: {
            action.data.map(elm => {
                if(parseInt(action.mediaId) !== elm.id)
                    arr.push(elm);
            });
            return Object.assign({}, state, {isLoadMore: action.isLoadMore, data: arr, mediaId: action.mediaId});
        }
        case type.GET_RELATIVE_MEDIA_NEW: {
            action.data.map(elm => {
                if(parseInt(action.mediaId) !== elm.id)
                    arr.push(elm);
            });
            return Object.assign({}, state, {isLoadMore: action.isLoadMore, data: arr, mediaId: action.mediaId});
        }
        case type.GET_RELATIVE_MEDIA_FAVORITED: {
            action.data.map(elm => {
                if(parseInt(action.mediaId) !== elm.id)
                    arr.push(elm);
            });
            return Object.assign({}, state, {isLoadMore: action.isLoadMore, data: arr, mediaId: action.mediaId});
        }
        case type.GET_RELATIVE_MEDIA: {
            action.data.map(elm => {
                if(parseInt(action.mediaId) !== elm.id)
                    arr.push(elm);
            });
            return Object.assign({}, state, {isLoadMore: action.isLoadMore, data: arr, mediaId: action.mediaId});
        }
        default: {
            return state;
        }
    }
}

export default myReducer;