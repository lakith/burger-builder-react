import * as authActions from './actionTypes';
import axios from 'axios'

export const authStart = () => {
    return {
        type:authActions.AUTH_START
    }
}

export const authSuccess = (idToken,localId) => {
    return {
        type:authActions.AUTH_SUCCCESS,
        idToken:idToken,
        localId : localId
    }
}

export const authFail = (error) => {
    return {
        type:authActions.AUTH_FAIL,
        error : error
    }
}

export const logout = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : authActions.AUTH_LOGOUT
    }
} 

export const checkAuthTimeOut = (expirationTime) => {
   return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000);
    }
}

export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken : true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCRiD3F8ZTJf_oXuWPazZtGsUQEk_hOrBY';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCRiD3F8ZTJf_oXuWPazZtGsUQEk_hOrBY';
        }
        axios.post (url,authData)
                    .then(
                        response => {

                            const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
                            localStorage.setItem('token',response.data.idToken);
                            localStorage.setItem('expirationDate', expirationDate);
                            localStorage.setItem('userId',response.data.localId);
                            dispatch(authSuccess(response.data.idToken,response.data.localId));
                            dispatch(checkAuthTimeOut(response.data.expiresIn));
                        }
                    )
                    .catch( err => {

                        dispatch(authFail(err.response.data.error));
                    } )
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type : authActions.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const userData = localStorage.getItem('userId');
                dispatch(authSuccess(token,userData));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            } else {
                dispatch(logout())
            }
        }
    }
}