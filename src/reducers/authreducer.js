import * as type from './../constants/constants';

var auth = {
    isAuth: false,
    token: '',
    userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        role: '',
        deviceIdentify: ''
    }
};

var myReducer = (state = auth, action) => {
    switch(action.type) {
        case type.LOGIN_FB: {
            return Object.assign({}, state, action.user);
        }
        default: {
            return state;
        }
    }
}

export default myReducer;