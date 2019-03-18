import * as type from './../constants/constants';

var dataSearch = [];

var myReducer = (state = dataSearch, action) => {
    switch(action.type) {
        case type.SEARCH_MEDIA: {
            state = action.data;
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;
