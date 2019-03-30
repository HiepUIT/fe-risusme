import * as type from './../constants/constants';

var categoryDetailState = {
    typeCategory: '',
    isLoadMore: true,
    data: []
};

var myReducer = (state = categoryDetailState, action) => {
    switch(action.type) {
        case type.GET_CATEGORY_DETAIL: {
            let arr = [];
            if(state.typeCategory === action.data.typeCategory)
                arr = state.data;
            action.data.data.map(elm => {
                arr.push(elm);
            });
            return Object.assign({}, state, {typeCategory: action.data.typeCategory,isLoadMore: action.data.isLoadMore, data: arr});
        }
        case type.GET_CATEGORY_DETAIL_FAVORITED: {
            let arr = [];
            console.log(state.typeCategory + ' - ' + action.data.typeCategory);
            if(state.typeCategory === action.data.typeCategory)
                arr = state.data;
            action.data.data.map(elm => {
                arr.push(elm);
            });
            return Object.assign({}, state, {typeCategory: type.GET_CATEGORY_DETAIL_FAVORITED, isLoadMore: action.data.isLoadMore, data: arr});
        }
        case type.GET_CATEGORY_DETAIL_FOLLOWED: {
            state = action.data;
            return state;
        }
        case type.GET_CATEGORY_DETAIL_HOT: {
            let arr = [];
            console.log(state.typeCategory + ' - ' + action.data.typeCategory);
            if(state.typeCategory === action.data.typeCategory)
                arr = state.data;
            action.data.data.map(elm => {
                arr.push(elm);
            });
            return Object.assign({}, state, {typeCategory: type.GET_CATEGORY_DETAIL_HOT, isLoadMore: action.data.isLoadMore, data: arr});
        }
        case type.GET_CATEGORY_DETAIL_NEW: {
            let arr = [];
            console.log(state.typeCategory + ' - ' + action.data.typeCategory);
            if(state.typeCategory === action.data.typeCategory)
                arr = state.data;
            action.data.data.map(elm => {
                arr.push(elm);
            });
            return Object.assign({}, state, {typeCategory: type.GET_CATEGORY_DETAIL_NEW, isLoadMore: action.data.isLoadMore, data: arr});
        }
        case type.RESET_CATEGORY_DETAIL: {
            return Object.assign({}, state, {typeCategory: '', isLoadMore: false, data: action.data});
        }
        default: {
            return state;
        }
    }
}

export default myReducer;