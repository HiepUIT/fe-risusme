import * as type from './../constants/constants';
import * as config from './../configs/configs';

import axios from 'axios';

export const getToken = () => {
    let authUserStr = sessionStorage.getItem('authUser');
    let authUser = JSON.parse(authUserStr);
    let token = '';
    if(typeof(authUser) !== 'undefined' && authUser.isAuth !== '') {
        token = 'Bearer ' + authUser.token;
    }
    return token;
}

export var getCategoryDetail = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            let isLoadMore = true;
            if(res.data.data.data.length === 0)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL, data: {typeCategory: category, isLoadMore: isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL, data: {typeCategory: category, isLoadMore: false, data: []}});
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
            let isLoadMore = true;
            if(res.data.data.data.length === 0)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: {typeCategory: type.GET_CATEGORY_DETAIL_HOT, isLoadMore: isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: {typeCategory: type.GET_CATEGORY_DETAIL_HOT, isLoadMore: false, data: []}});
        })
    }
}

export var getCategoryDetailFollowed = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_FOLLOWED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            dispatch({typeCategory: type.GET_CATEGORY_DETAIL_FOLLOWED, type: type.GET_CATEGORY_DETAIL_FOLLOWED, data: res.data.data.data});
        }).catch(err => {
            dispatch({typeCategory: type.GET_CATEGORY_DETAIL_FOLLOWED, type: type.GET_CATEGORY_DETAIL_FOLLOWED, data: []});
        })
    }
}

export var getCategoryDetailNew = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_NEW.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url).then(res => {
            let isLoadMore = true;
            if(res.data.data.data.length === 0)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL_NEW, data: {typeCategory: type.GET_CATEGORY_DETAIL_NEW, isLoadMore: isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: {typeCategory: type.GET_CATEGORY_DETAIL_NEW, isLoadMore: false, data: []}});
        })
    }
}

export var getCategoryDetailFavorited = (category, page) => {
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_FAVORITED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        let token = getToken();
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            let isLoadMore = true;
            if(res.data.data.data.length === 0)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL_FAVORITED, data: {typeCategory: category, isLoadMore: isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_FAVORITED, data: {typeCategory: category, isLoadMore: false, data: []}});
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
            dispatch({type: type.RESET_CATEGORY_DETAIL, data: {}});
        }).catch(err => {
            dispatch({type: type.SEARCH_MEDIA, data: {}});
        })
    }
}
export var loginAction = (auth, login) => {
    return (dispatch) => {
        if(typeof(auth) != 'undefined') {
            let url = config.API_LOGIN;
            let provider = type.FACEBOOK;
            let code = auth.accessToken;

            if(login == type.GOOGLE)
                provider = type.GOOGLE;
            let data = {
                codeType: 'accesstoken',
                code: code,
                provider: provider,
                redirectUrl: '',
                clientId: ''
            }
            axios.post(url, data).then(res => {
                if(res.data.err_code == 0) {
                    let user = {
                        isAuth: true,
                        token: res.data.data.token,
                        userInfo: res.data.data.user_info
                    }
                    let authUser = JSON.stringify(user);
                    sessionStorage.setItem('authUser', authUser);
                    dispatch({type: login, user: user});
                } else {
                    sessionStorage.setItem('authUser', null);
                }
            })
        } else {
            sessionStorage.setItem('authUser', null);
            dispatch({type: login, user: {}});
        }
    }
}

export var likeAction = mediaId => {
    let url = config.API_LIKE_MEDIA + '?id=' + mediaId;
    let token = getToken();

    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

export var dislikeAction = mediaId => {
    let url = config.API_DISLIKE_MEDIA + '?id=' + mediaId;
    let token = getToken();

    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

export var favoriteAction = mediaId => {
    let url = config.API_FAVORITE_MEDIA + '?id=' + mediaId;
    let token = getToken();

    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}