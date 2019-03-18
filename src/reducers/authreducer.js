import * as type from './../constants/constants';

var auth = {
    isAuth: false,
    tokend: '',
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
            state.isAuth = true;
            state.user = action.user;
            return state;
        }
        default: {
            return state;
        }
    }
}

export default myReducer;