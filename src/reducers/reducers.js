import {combineReducers} from 'redux';
import categoryDetailReducer from './categorydetailreducer';
import listCategoryReducer from './listcategoryReducer';
import mediaDetailReducer from './mediadetailreducer';
import searchReducer from './searchreducer';
import authReducer from './authreducer';
import suggestSearchReducer from './suggestsearchreducer';

const myReducer = combineReducers({
    categoryDetailReducer,
    listCategoryReducer,
    mediaDetailReducer,
    searchReducer,
    authReducer,
    suggestSearchReducer
})

export default myReducer;
