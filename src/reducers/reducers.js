import {combineReducers} from 'redux';
import categoryDetailReducer from './categorydetailreducer';
import listCategoryReducer from './listcategoryReducer';
import mediaDetailReducer from './mediadetailreducer';
import searchReducer from './searchreducer';
import authReducer from './authreducer';

const myReducer = combineReducers({
    categoryDetailReducer,
    listCategoryReducer,
    mediaDetailReducer,
    searchReducer,
    authReducer
})

export default myReducer;
