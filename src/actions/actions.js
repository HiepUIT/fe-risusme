import * as type from './../constants/constants';
import * as config from './../configs/configs';

import axios from 'axios';

export var getCategoryDetail = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({type: type.GET_CATEGORY_DETAIL, data: res.data.data.data});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL, data: []});
        })
    }
}

export var getListCategory = () => {
    return (dispatch) => {
        let url = config.API_LIST_CATEGORY;
        axios.get(url).then(res => {
            dispatch({type: type.LIST_CATEGORY, data: res.data.data.categories});
        }).catch(err => {
            dispatch({type: type.LIST_CATEGORY, data: []});
        })
    }
}

export var getCategoryDetailHot = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_HOT.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: res.data.data.data});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: []});
        })
    }
}

export var getCategoryDetailFollowed = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_FOLLOWED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({type: type.GET_CATEGORY_DETAIL_FOLLOWED, data: res.data.data.data});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_FOLLOWED, data: []});
        })
    }
}

export var getCategoryDetailNew = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_NEW.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({type: type.GET_CATEGORY_DETAIL_NEW, data: res.data.data.data});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_NEW, data: []});
        })
    }
}

export var getCategoryDetailFavorited = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_FAVORITED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({type: type.GET_CATEGORY_DETAIL_FAVORITED, data: res.data.data.data});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_FAVORITED, data: []});
        })
    }
}

export var getMedialDetail = (id) => {
    return (dispatch) => {
        let url = config.API_MEDIA_DETAIL.replace('{ID}', id);
        axios.get(url).then(res => {
            dispatch({type: type.GET_MEDIA_DETAIL, data: res.data.data.media});
        }).catch(err => {
            dispatch({type: type.GET_MEDIA_DETAIL, data: {}});
        })
    }
}

export var searchMedia = (title, page) => {
    return (dispatch) => {
        let url = config.API_SEARCH_MEDIA.replace('{TITLE}', title).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({type: type.SEARCH_MEDIA, data: res.data.data.data});
        }).catch(err => {
            dispatch({type: type.SEARCH_MEDIA, data: {}});
        })
    }
}
export var loginAction = (auth, type) => {
    return (dispatch) => {
        if(typeof(auth) != 'undefined') {
            localStorage.setItem('isAuthentication', true);
            dispatch({type: type, user: auth});
        } else
            dispatch({type: type, user: {}});
    }
}