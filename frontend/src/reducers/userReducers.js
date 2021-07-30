import * as constants from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch(action.type){
        case constants.USER_LOGIN_REQUEST:
            return {loading:true}
        case constants.USER_LOGIN_SUCCESS:
            return {loading:false, userInfo:action.payload}
        case constants.USER_LOGIN_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
}

export const logoutReducer = (state, action) => {
    switch(action.type){
        case constants.USER_LOGOUT :
            return {}
        default:
            return state
    }
    
}

export const userListReducer = (state={}, action) => {
    switch(action.type){
        case constants.USER_LIST_REQUEST:
            return{
                loading:true,
                users:[]
            }
        case constants.USER_LIST_SUCCESS:
            return {
                loading:false,
                users:action.payload
            }
        case constants.USER_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case constants.USER_LIST_RESET:
            return {
                users:[]
            }
        default:
            return state;
    }
}