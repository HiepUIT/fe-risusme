import * as type from './../constants/constants';
import * as config from './../configs/configs';

import axios from 'axios';

export const getToken = () => {
    let authUserStr = sessionStorage.getItem('authUser');
    let authUser = JSON.parse(authUserStr);
    let token = '';
    if(authUser !== null && authUser.isAuth !== '') {
        token = 'Bearer ' + authUser.token;
    }
    return token;
}

export const checkAuth = () => {
    let authUserStr = sessionStorage.getItem('authUser');
    let authUser = JSON.parse(authUserStr);
    let isAuth = false;
    if(authUser !== null && authUser.isAuth === true) {
        isAuth = true;
    }
    return isAuth;
}

export const getAuth = () => {
    let authUserStr = sessionStorage.getItem('authUser');
    let authUser = JSON.parse(authUserStr);
    if(authUser !== undefined) {
        let auth = {name: authUser.userInfo.name,
            avatar: authUser.userInfo.avatar};
        return auth;
    }
    return null;
}

export var getCategoryDetail = (category, page) => {
    let token = getToken();
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            let isLoadMore = true;
            if(res.data.data.current_page === res.data.data.last_page)
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

export var resetCategoryDetail = () => {
    return async (dispatch) => {
        await dispatch({type: type.RESET_CATEGORY_DETAIL, data: []});
    }
}
 
export var getCategoryDetailHot = (category, page) => {
    let token = getToken();
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_HOT.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            let isLoadMore = true;
            if(res.data.data.current_page === res.data.data.last_page)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: {typeCategory: type.GET_CATEGORY_DETAIL_HOT, isLoadMore: isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: {typeCategory: type.GET_CATEGORY_DETAIL_HOT, isLoadMore: false, data: []}});
        })
    }
}

export var getCategoryDetailFollowed = (category, page) => {
    let token = getToken();
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_FOLLOWED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            var data = [];
            if(res.data.data.data !== undefined)
                data = res.data.data.data;
            let isLoadMore = true;
            if(res.data.data.current_page === res.data.data.last_page)
                isLoadMore = false;
            dispatch({typeCategory: type.GET_CATEGORY_DETAIL_FOLLOWED, type: type.GET_CATEGORY_DETAIL_FOLLOWED, isLoadMore, data});
        }).catch(err => {
            dispatch({typeCategory: type.GET_CATEGORY_DETAIL_FOLLOWED, type: type.GET_CATEGORY_DETAIL_FOLLOWED,isLoadMore: false, data: []});
        })
    }
}

export var getCategoryDetailNew = (category, page) => {
    let token = getToken();
    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_NEW.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            let isLoadMore = true;
            if(res.data.data.current_page === res.data.data.last_page)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL_NEW, data: {typeCategory: type.GET_CATEGORY_DETAIL_NEW, isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_HOT, data: {typeCategory: type.GET_CATEGORY_DETAIL_NEW, isLoadMore: false, data: []}});
        })
    }
}

export var getCategoryDetailFavorited = (category, page) => {
    let token = getToken();

    return (dispatch) => {
        let url = config.API_CATEGORY_DETAIL_FAVORITED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            let isLoadMore = true;
            if(res.data.data.data.length === 0)
                isLoadMore = false;
            dispatch({type: type.GET_CATEGORY_DETAIL_FAVORITED, data: {typeCategory: type.GET_CATEGORY_DETAIL_FAVORITED, isLoadMore: isLoadMore, data: res.data.data.data}});
        }).catch(err => {
            dispatch({type: type.GET_CATEGORY_DETAIL_FAVORITED, data: {typeCategory: type.GET_CATEGORY_DETAIL_FAVORITED, isLoadMore: false, data: []}});
        })
    }
}

export var getMedialDetail = (id) => {
    let token = getToken();
    return (dispatch) => {
        let url = config.API_MEDIA_DETAIL.replace('{ID}', id);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            dispatch({type: type.GET_MEDIA_DETAIL, data: res.data.data.media});
        }).catch(err => {
            dispatch({type: type.GET_MEDIA_DETAIL, data: {}});
        })
    }
}

export var resetMediaDetail = () => {
    return async (dispatch) => {
        await dispatch({type: type.RESET_MEDIA_DETAIL, data: {}});
    }
}

export var searchMedia = (title, page) => {
    let token = getToken();
    return (dispatch) => {
        let url = config.API_SEARCH_MEDIA.replace('{TITLE}', title).replace('{PAGE}', page);
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            dispatch({type: type.SEARCH_MEDIA, data: res.data.data.data});
            dispatch({type: type.RESET_CATEGORY_DETAIL, data: {}});
        }).catch(err => {
            dispatch({type: type.SEARCH_MEDIA, data: {}});
        })
    }
}

export var loginAction = (auth, login) => {
    return async (dispatch) => {
        if(auth !== undefined) {
            let url = config.API_LOGIN;
            let provider = type.FACEBOOK;
            let code = auth.accessToken;

            if(login === type.GOOGLE)
                provider = type.GOOGLE;
            let data = {
                codeType: 'accesstoken',
                code: code,
                provider: provider,
                redirectUrl: '',
                clientId: ''
            }
            await axios.post(url, data).then(res => {
                if(res.data.err_code === 0) {
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
            }).catch(err => {
                sessionStorage.setItem('authUser', null);
                dispatch({type: login, user: {}});
            });
        } else {
            sessionStorage.setItem('authUser', null);
            dispatch({type: login, user: {}});
        }
    }
}

export var likeAction = mediaId => {
    let url = config.API_LIKE_MEDIA + '?id=' + mediaId;
    let token = getToken();

    if(token === '') 
        return;

    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

export var dislikeAction = mediaId => {
    let url = config.API_DISLIKE_MEDIA + '?id=' + mediaId;
    let token = getToken();

    if(token === '') 
        return;

    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

export var favoriteAction = mediaId => {
    let url = config.API_FAVORITE_MEDIA + '?id=' + mediaId;
    let token = getToken();

    if(token === '') 
        return;

    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

export var getListRelativeMedia = (typeRelativeMedia, category, page, mediaId) => {
    let url = '';
    if(typeRelativeMedia === type.GET_RELATIVE_MEDIA_HOT)
        url = config.API_CATEGORY_DETAIL_HOT.replace('{CATEGORYID}', category).replace('{PAGE}', page);
    else if(typeRelativeMedia === type.GET_RELATIVE_MEDIA_NEW)
        url = config.API_CATEGORY_DETAIL_NEW.replace('{CATEGORYID}', category).replace('{PAGE}', page);
    else if(typeRelativeMedia === type.GET_RELATIVE_MEDIA_FAVORITED)
        url = config.API_CATEGORY_DETAIL_FAVORITED.replace('{CATEGORYID}', category).replace('{PAGE}', page);
    else
        url = config.API_CATEGORY_DETAIL.replace('{CATEGORYID}', category).replace('{PAGE}', page);
    let token = getToken();
    return (dispatch) => {
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            let isLoadMore = true;
            if(res.data.data.data.length === 0)
                isLoadMore = false;
            dispatch({type: typeRelativeMedia, isLoadMore, data: res.data.data.data, mediaId});
        }).catch(err => {
            dispatch({type: typeRelativeMedia, isLoadMore: false, data: [], mediaId});
        });
    }
}

export var resetRelativeMedia = (mediaId) => {
    return async (dispatch) => {
        await dispatch({type: type.RESET_RELATIVE_MEDIA, data: {}, mediaId: mediaId});
    }
}

export var commentAction = (content, idCode, id, mediaId) => {
    let token = getToken();
    if(token === '') 
        return;
    let url = config.API_COMMENT_MEDIA;
    let cmtObj = {
        content,
        idCode,
        id,
        mediaId
    };

    return async (dispatch) => {
        await axios.put(url, cmtObj, {headers: {'Authorization': token}}).then(res => {
            dispatch({type: type.COMMENT_ACTION, data: res.data.data});
        }).catch(err => {
            dispatch({type: type.COMMENT_ACTION, data: {}});
        });
    }
    
}

export var getListComment = (mediaId, page) => {
    let url = config.API_LIST_COMMENT.replace('{MEDIAID}', mediaId).replace('{PAGE}', page);
    let token = getToken();
    return (dispatch) => {
        axios.get(url, {headers: {'Authorization': token}}).then(res => {
            console.log('data', res.data.data);
            dispatch({type: type.GET_LIST_COMMENT_ACTION, data: {mediaId, data: res.data.data}});
        }).catch(err => {
            console.log('err', err);
            dispatch({type: type.GET_LIST_COMMENT_ACTION, data: {}});
        })
    }
}

export var resetListComment = () => {
    return async (dispatch) => {
        await dispatch({type: type.RESET_LIST_COMMENT_ACTION, data: []})
    }
}

export var likeCommentAction = (cmtId) => {
    let token = getToken();
    if(token === '') 
        return;
    
    let url = config.API_LIKE_COMMENT + '?id=' + cmtId;
    axios.put(url, {}, {headers: {'Authorization': token}}).then(res => {
        console.log('likeCommentAction', res);
    }).then(err => {
        console.log('likeCommentAction', err);
    })
}