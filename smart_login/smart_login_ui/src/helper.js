const { default: axios } = require("axios");

//save login info 
const authenticate = (response,next) => {
    if(window !== "undefined"){
        sessionStorage.setItem('token',JSON.stringify(response.data.token))
        sessionStorage.setItem('user',JSON.stringify(response.data.name))
    }
    next();
}

//access users info from session storage
const getToken = () => {
    if(window !== 'undefined'){
        if(sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('token'));
        }else{
            return false;
        }
    }
}

//access user from session storage

const getUser = () => {
    if(window !== 'undefined'){
        if(sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('user'));
        }else{
            return false;
        }
    }
}

//remove token from session storage
const logOut = (next) => {
    if(window !== 'undefined'){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    next();
}


module.exports = {
    authenticate,
    getToken,
    getUser,
    logOut
}