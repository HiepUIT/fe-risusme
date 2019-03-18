import * as type from '../constants/constants';

var listCategory = [];

var myReducer = (state = listCategory, action) => {
    switch(action.type) {
        case type.LIST_CATEGORY: {
            state = action.data;
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;