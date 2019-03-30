import {combineReducers} from 'redux';
import categoryDetailReducer from './categorydetailreducer';
import listCategoryReducer from './listcategoryreducer';
import mediaDetailReducer from './mediadetailreducer';
import searchReducer from './searchreducer';
import authReducer from './authreducer';
import suggestSearchReducer from './suggestsearchreducer';
import listRelativeMediaReducer from './listrealativemediareducer';
import commentReducer from './commentreducer';
import listCommentReducer from './listcommentreducer';

const myReducer = combineReducers({
    categoryDetailReducer,
    listCategoryReducer,
    mediaDetailReducer,
    searchReducer,
    authReducer,
    suggestSearchReducer,
    listRelativeMediaReducer,
    commentReducer,
    listCommentReducer
})

export default myReducer;
